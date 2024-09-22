import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Space,
  Spin,
  Typography,
} from "antd";
import {
  BankOutlined,
  ExclamationCircleOutlined,
  SendOutlined,
} from "@ant-design/icons";
import NavProfile from "../components/NavProfile/NavProfile";
import {
  AccountApi,
  BankAccountsListResponse,
  CreateWithdrawRequest,
  ErrorCode,
  UpdateBankAccountRequest,
} from "../api";
import { BankSelectionModal } from "../components/Profile/BankSelectionModal";
import { useFetchBankAccounts } from "../hooks/useFetchBankAccounts";
import { AxiosError } from "axios";
import { useAuth } from "../components/Auth/Auth";

const { Title, Text } = Typography;

const Withdraw: React.FC = () => {
  const { currentUser } = useAuth();
  const userId = currentUser?.id || '';
  const [form] = Form.useForm();
  const [selectedBank, setSelectedBank] =
    useState<BankAccountsListResponse | null>(null);
  const [showBankSelectionModal, setShowBankSelectionModal] = useState(false);
  const {
    bankAccounts,
    fetchBankAccounts,
    isLoading: isBankAccountsLoading,
  } = useFetchBankAccounts(userId);
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [addEditBankLoading, setAddEditBankLoading] = useState(false);
  const [currentBalance, setCurrentBalance] = useState<number>(0);

  useEffect(() => {
    fetchBankAccounts();
  }, [fetchBankAccounts]);

  useEffect(() => {
    if (bankAccounts.length > 0) {
      const defaultBankAccount =
        bankAccounts.find((bankAccount) => bankAccount.isDefault) ||
        bankAccounts[0];
      setSelectedBank(defaultBankAccount);
    }
  }, [bankAccounts]);
  console.log(userId);

  useEffect(() => {
    const fetchBalance = async () => {
      const infoBalance = new AccountApi();
      const resInfoBalance = await infoBalance.apiAccountsIdGet(userId);
      // Access the balance from the data object
      const balance = resInfoBalance?.data.data?.balance; // Default to 0 if undefined or null
      setCurrentBalance(balance!);
    };

    fetchBalance();
    const interval = setInterval(fetchBalance, 5000); // Refetch every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [userId]);

  const showConfirmWithdraw = (values: { amount: number }) => {
    Modal.confirm({
      title: "Confirm Withdrawal",
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to withdraw ${values.amount}?`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleWithdraw(values);
      },
    });
  };

  const handleWithdraw = async (values: { amount: number }) => {
    if (!selectedBank) {
      message.error("Please select a bank account first!");
      return;
    }

    if (values.amount > currentBalance) {
      message.error("Withdrawal amount exceeds current balance!");
      return;
    }

    setWithdrawLoading(true);
    try {
      const requestBody: CreateWithdrawRequest = {
        amount: values.amount,
        bank: selectedBank.bankName!,
        bankAccountNumber: selectedBank.bankAccountNumber!,
        bankAccountName: selectedBank.bankAccountName!,
      };

      const accountApi = new AccountApi();
      await accountApi.apiAccountsAccountIdWithdrawsPost(userId, requestBody);
      message.success("Withdrawal request sent successfully!");
      form.resetFields();

      setTimeout(() => {
        window.location.reload();
        setWithdrawLoading(false);
      }, 1500);
    } catch (error) {
      message.error(
        "Withdrawal request failed. Please check your information!"
      );
      console.error("API error:", error);
      setWithdrawLoading(false);
    }
  };

  const handleBankAccountOperation = async (
    operation: "add" | "edit" | "remove",
    values: UpdateBankAccountRequest & {
      bankAccountId?: string;
    }
  ) => {
    console.log("Operation:", operation, "Values:", values);
    setAddEditBankLoading(true);
    const accountApi = new AccountApi();
    try {
      switch (operation) {
        case "add":
          await accountApi.apiAccountsAccountIdBankaccountsPost(userId, {
            bankName: values.bankName!,
            bankAccountName: values.bankAccountName!,
            bankAccountNumber: values.bankAccountNumber!,
            bankLogo: values.bankLogo!,
          });
          message.success("Bank account added successfully");
          break;
        case "edit":
          if (!values.bankAccountId) {
            throw new Error("Bank account ID is required for editing");
          }
          await accountApi.apiAccountsAccountIdBankaccountsBankAccountIdPut(
            userId,
            values.bankAccountId,
            {
              bankAccountName: values.bankAccountName!,
              bankAccountNumber: values.bankAccountNumber!,
              bankName: values.bankName!,
              bankLogo: values.bankLogo!,
              isDefault: values.isDefault,
            }
          );
          message.success("Bank account updated successfully");
          if (
            selectedBank &&
            selectedBank.bankAccountId === values.bankAccountId
          ) {
            setSelectedBank(selectedBank);
          }
          break;
        case "remove":
          if (!values.bankAccountId) {
            throw new Error("Bank account ID is required for removal");
          }
          await accountApi.apiAccountsAccountIdBankaccountsBankAccountIdDelete(
            userId,
            values.bankAccountId
          );
          message.success("Bank account removed successfully");
          if (selectedBank?.bankAccountId === values.bankAccountId) {
            setSelectedBank(null);
          }
          break;
      }
      fetchBankAccounts();
    } catch (e) {
      if (
        e instanceof AxiosError &&
        e.response?.data.errorCode === ErrorCode.NoBankAccountLeft
      ) {
        message.error("You can't remove your last bank account");
      } else {
        console.error(`Error ${operation}ing bank account:`, e);
        message.error(`Failed to ${operation} bank account`);
      }
    } finally {
      setAddEditBankLoading(false);
    }
  };

  const handleSelectBank = (bank: BankAccountsListResponse) => {
    setSelectedBank(bank);
    setShowBankSelectionModal(false);
  };

  const renderSelectedBankInfo = () => (
    <Card style={{ marginBottom: "16px", background: "#fff" }}>
      <Space align="center" style={{ width: "100%" }}>
        <img
          src={selectedBank!.bankLogo || "N/A"}
          alt={selectedBank!.bankName || "N/A"}
          style={{
            width: 100,
            height: 40,
            objectFit: "contain",
            marginRight: 16,
          }}
        />
        <div>
          <Text strong>{selectedBank!.bankName}</Text>
          <br />
          <Text>{selectedBank!.bankAccountNumber}</Text>
          <br />
          <Text>{selectedBank!.bankAccountName}</Text>
        </div>
      </Space>
    </Card>
  );

  return (
    <Card>
      <Row gutter={[16, 16]}>
        <Col span={5}>
          <NavProfile />
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
              <Title
                level={2}
                style={{ textAlign: "center", marginBottom: "24px" }}
              >
                Withdraw
              </Title>
              <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                <Button
                  icon={<BankOutlined />}
                  onClick={() => setShowBankSelectionModal(true)}
                  style={{ marginBottom: "16px" }}
                >
                  {selectedBank ? "Change Bank Account" : "Select Bank Account"}
                </Button>

                {selectedBank && renderSelectedBankInfo()}

                <Form
                  form={form}
                  layout="vertical"
                  name="withdrawForm"
                  onFinish={showConfirmWithdraw}
                >
                  <Form.Item
                    name="amount"
                    label="Amount"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the amount to withdraw!",
                      },
                      {
                        validator: (_, value) => {
                          if (value && value > 100000000) {
                            return Promise.reject(
                              new Error(
                                "Withdrawal amount cannot exceed 100,000,000!"
                              )
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input
                      type="number"
                      placeholder="Enter the amount to withdraw"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={!selectedBank || withdrawLoading}
                      loading={withdrawLoading}
                      icon={<SendOutlined />}
                      style={{
                        width: "100%",
                        backgroundColor: "black",
                        borderColor: "black",
                      }}
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
              onSelect={handleSelectBank}
              bankAccounts={bankAccounts}
              selectedBankAccountId={selectedBank?.bankAccountId || null}
              onAddNewBankAccount={(values) =>
                handleBankAccountOperation("add", values)
              }
              onEditBankAccount={(values) =>
                handleBankAccountOperation("edit", values)
              }
              onRemoveBankAccount={(bankAccountId) =>
                handleBankAccountOperation("remove", { bankAccountId })
              }
              loading={isBankAccountsLoading || addEditBankLoading}
            />
          </Spin>
        </Col>
      </Row>
    </Card>
  );
};

export default Withdraw;
