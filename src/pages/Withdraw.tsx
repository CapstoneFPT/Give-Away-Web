import React, {useCallback, useEffect, useState} from "react"; // Thêm useState
import {Button, Card, Col, Form, Input, message, Row, Space, Spin, Typography,} from "antd";
import {BankOutlined, SendOutlined} from "@ant-design/icons";
import NavProfile from "../components/NavProfile/NavProfile";
import {AccountApi, BankAccountsListResponse, CreateWithdrawRequest, ErrorCode, UpdateBankAccountRequest} from "../api";
import {BankSelectionModal} from "../components/Profile/BankSelectionModal.tsx";
import {useFetchBankAccounts} from "../hooks/useFetchBankAccounts.tsx";
import {AxiosError} from "axios";


const styles = {
    buttonRefunds: {
        marginLeft: "80%",
        backgroundColor: "#000000",
        color: "white",
        width: "20%",
        height: "50px",
        border: "2px solid black",
        padding: "10px 20px",
        borderRadius: "30px",
    },
    formContainer: {
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
    },
};

const Withdraw = () => {
    const userId = JSON.parse(localStorage.getItem("userId") || "null");
    console.log(userId);

    const [form] = Form.useForm(); // Khởi tạo form
    const [amount, setAmount] = useState(0); // State để lưu số tiền
    const [bankListVersion, setBankListVersion] = useState(0);
    const [selectedBank, setSelectedBank] = useState<BankAccountsListResponse | null>(null);
    const [showBankSelectionModal, setShowBankSelectionModal] = useState(false);
    const {bankAccounts, fetchBankAccounts, isLoading: isBankAccountsLoading} = useFetchBankAccounts(userId);
    const [withdrawLoading, setWithdrawLoading] = useState(false);
    const [addEditBankLoading, setAddEditBankLoading] = useState(false);


    const updateBankAccounts = useCallback(() => {
        fetchBankAccounts();
        setBankListVersion(prev => prev + 1);
    }, [fetchBankAccounts]);

    useEffect(() => {
        updateBankAccounts();
    }, []);

    useEffect(() => {
        if (bankAccounts.length > 0) {
            const defaultBankAccount = bankAccounts.find(bankAccount => bankAccount.isDefault) || bankAccounts[0];
            setSelectedBank(defaultBankAccount)
        }
    }, [bankAccounts]);


    const handleSubmit = async (values: any) => {

        const confirmWithdraw = window.confirm(`Bạn có chắc chắn muốn rút ${values.amount} không?`);
        if (!confirmWithdraw) return;

        setWithdrawLoading(true);
        try {
            const requestBody: CreateWithdrawRequest = {
                amount: values.amount,
                bank: selectedBank!.bankName!,
                bankAccountNumber: selectedBank!.bankAccountNumber!,
                bankAccountName: selectedBank!.bankAccountName!,
            };


            const accountApi = new AccountApi();
            const response = await accountApi.apiAccountsAccountIdWithdrawsPost(
                userId,
                requestBody
            )
            message.success("Refund request sent successfully!");
            console.log("Form values: ", values);
            console.log("API response: ", response);

            form.resetFields();
        } catch (error) {
            message.error("Send refund request failed. Please check your information!");
            console.error("API error: ", error);
        } finally {
            setWithdrawLoading(false);
        }
    };

    const handleSubmitFailed = (errorInfo: any) => {
        // Handle form submission failure
        message.error("Send refund request failed. Please check your information!");
        console.log("Failed:", errorInfo);
    };

    const handleAddBankAccount = async (values: UpdateBankAccountRequest) => {
        setAddEditBankLoading(true);
        console.log("Adding bank account:", values);
        const accountApi = new AccountApi();
        try {
            await accountApi.apiAccountsAccountIdBankaccountsPost(userId, {
                bankAccountName: values.bankAccountName!,
                bankAccountNumber: values.bankAccountNumber!,
                bankName: values.bankName!,
                bankLogo: values.bankLogo!,
            });
            message.success("Bank account added successfully");
            updateBankAccounts();
        } catch (e) {
            console.error('Error adding bank account:', e);
            message.error("Failed to add bank account");
        } finally {
            setAddEditBankLoading(false);
        }
    };

    const handleEditBankAccount = async (values: any) => {
        console.log("Editing bank account:", values);
        setAddEditBankLoading(true);
        const accountApi = new AccountApi();
        try {
            await accountApi.apiAccountsAccountIdBankaccountsBankAccountIdPut(userId, values.bankAccountId!, {
                bankAccountName: values.bankAccountName,
                bankAccountNumber: values.bankAccountNumber,
                bankName: values.bankName,
                bankLogo: values.bankLogo,
                isDefault: values.isDefault,
            });
            message.success("Bank account updated successfully");
            updateBankAccounts();
            // Update the selectedBank state if it's the one being edited
            if (selectedBank && selectedBank.bankAccountId === values.bankAccountId) {
                setSelectedBank({
                    ...selectedBank,
                    ...values,
                });
            }
        } catch (e) {
            console.error('Error updating bank account:', e);
            message.error("Failed to update bank account");
        } finally {
            setAddEditBankLoading(false);
        }
    };

    const handleRemoveBankAccount = async (bankAccountId: string) => {
        setAddEditBankLoading(true);
        const accountApi = new AccountApi();
        try {
            await accountApi.apiAccountsAccountIdBankaccountsBankAccountIdDelete(userId, bankAccountId);
            updateBankAccounts();
            if (selectedBank?.bankAccountId === bankAccountId) {
                setSelectedBank(null);
            }
            message.success("Bank account removed successfully");
        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.response?.data.errorCode == ErrorCode.NoBankAccountLeft) {
                    message.error("You can't remove your last bank account");
                    return;
                }
                console.error('Error removing bank account:', e);
                message.error("Failed to remove bank account");
            } else {
                console.error('Error removing bank account:', e);
                message.error("Failed to remove bank account");
            }
        } finally {
            setAddEditBankLoading(false);
        }
    };

    return (
        <Card>
            <Row gutter={[16, 16]}>
                <Col span={5}>
                    <NavProfile/>
                </Col>
                <Col span={19}>
                    <Spin spinning={isBankAccountsLoading}>
                        <Card
                            style={{
                                borderRadius: "10px",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                background: "#f8f8f8",
                            }}
                        >
                            <Typography.Title level={2} style={{textAlign: "center", marginBottom: "24px"}}>
                                Withdraw
                            </Typography.Title>
                            <div style={{maxWidth: "600px", margin: "0 auto"}}>
                                <Button
                                    icon={<BankOutlined/>}
                                    onClick={() => setShowBankSelectionModal(true)}
                                    style={{marginBottom: "16px"}}
                                >
                                    {selectedBank ? 'Change Bank Account' : 'Select Bank Account'}
                                </Button>

                                {selectedBank && (<Card style={{marginBottom: "16px", background: "#fff"}}>
                                    <Space align="center" style={{width: "100%"}}>
                                        <img
                                            src={selectedBank.bankLogo || 'N/A'}
                                            alt={selectedBank.bankName || 'N/A'}
                                            style={{width: 40, height: 40, objectFit: 'contain', marginRight: 16}}
                                        />
                                        <div>
                                            <Typography.Text strong>{selectedBank.bankName}</Typography.Text><br/>
                                            <Typography.Text>{selectedBank.bankAccountNumber}</Typography.Text><br/>
                                            <Typography.Text>{selectedBank.bankAccountName}</Typography.Text>
                                        </div>
                                    </Space>
                                </Card>)}

                                <Form
                                    form={form}
                                    layout="vertical"
                                    name="withdrawForm"
                                    onFinish={handleSubmit}
                                    onFinishFailed={handleSubmitFailed}
                                >
                                    <Form.Item
                                        name="amount"
                                        label="Amount"
                                        rules={[{required: true, message: "Please enter the amount to withdraw!"}]}
                                    >
                                        <Input
                                            type="number"
                                            placeholder="Enter the amount to withdraw"
                                            onChange={(e) => setAmount(Number(e.target.value))}
                                            style={{width: "100%"}}
                                        />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            disabled={!selectedBank || withdrawLoading}
                                            loading={withdrawLoading}
                                            icon={<SendOutlined/>}
                                            style={{width: "100%",backgroundColor: "black", borderColor: "black"}}
                                        >
                                            Withdraw
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </Card>

                        <BankSelectionModal
                            visible={showBankSelectionModal}
                            onCancel={() => setShowBankSelectionModal(false)}
                            onSelect={(bankAccount) => {
                                setSelectedBank(bankAccount);
                                setShowBankSelectionModal(false);
                            }}
                            bankAccounts={bankAccounts}
                            selectedBankAccountId={selectedBank?.bankAccountId || null}
                            onAddNewBankAccount={handleAddBankAccount}
                            onEditBankAccount={handleEditBankAccount}
                            onRemoveBankAccount={handleRemoveBankAccount}
                            loading={isBankAccountsLoading || addEditBankLoading}
                            key={bankListVersion}
                        />
                    </Spin>
                </Col>
            </Row>
        </Card>
    );
};

export default Withdraw;