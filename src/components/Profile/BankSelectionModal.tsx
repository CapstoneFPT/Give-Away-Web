import React, {useMemo, useState} from 'react';
import {Button, Image, List, Modal, notification, Popconfirm, Spin, Typography} from 'antd';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import {BankAccountsListResponse, UpdateBankAccountRequest} from '../../api';
import {BankForm} from './BankForm';

interface BankSelectionModalProps {
    visible: boolean;
    onCancel: () => void;
    onSelect: (bankAccount: BankAccountsListResponse) => void;
    bankAccounts: BankAccountsListResponse[];
    selectedBankAccountId: string | null;
    onAddNewBankAccount: (values: any) => Promise<void>;
    onEditBankAccount: (values: any) => Promise<void>;
    onRemoveBankAccount: (bankAccountId: string) => Promise<void>;
    loading: boolean;
}

export const BankSelectionModal: React.FC<BankSelectionModalProps> = ({
                                                                          visible,
                                                                          onCancel,
                                                                          onSelect,
                                                                          bankAccounts,
                                                                          selectedBankAccountId,
                                                                          onAddNewBankAccount,
                                                                          onEditBankAccount,
                                                                          loading,
                                                                          onRemoveBankAccount
                                                                      }) => {
    const [showBankForm, setShowBankForm] = useState(false);
    const [editingBankAccount, setEditingBankAccount] = useState<BankAccountsListResponse | null>(null);
    const [formLoading, setFormLoading] = useState(false);

    const handleAddNewBank = () => {
        if (bankAccounts.length === 5) {
            notification.error({
                message: "Cannot add more than 5 bank accounts",
            });
            return;
        }
        setEditingBankAccount(null);
        setShowBankForm(true);
    };

    const handleEditBank = (bankAccount: BankAccountsListResponse) => {
        setEditingBankAccount(bankAccount);
        setShowBankForm(true);
    };

    const handleBankFormCancel = () => {
        setShowBankForm(false);
        setEditingBankAccount(null);
    };

    const sortedBankAccounts = useMemo(() => {
        return [...bankAccounts].sort((a, b) => {
            if (a.isDefault && !b.isDefault) return -1;
            if (!a.isDefault && b.isDefault) return 1;
            return 0;
        });
    }, [bankAccounts]);

    const handleBankFormSubmit = async (values: UpdateBankAccountRequest) => {
        setFormLoading(true);
        try {
            if (editingBankAccount) {
                await onEditBankAccount({...values, bankAccountId: editingBankAccount.bankAccountId});
            } else {
                await onAddNewBankAccount(values);
            }
            setShowBankForm(false);
            setEditingBankAccount(null);
        } catch (error) {
            console.error('Error submitting bank form:', error);
        } finally {
            setFormLoading(false);
        }
    };

    const handleRemoveBank = async (bankAccountId: string) => {
        onRemoveBankAccount(bankAccountId);
    };

    return (
        <Modal
            title={<Typography.Text strong style={{fontSize: '18px'}}>Select Bank Account</Typography.Text>}
            open={visible}
            onCancel={onCancel}
            footer={null}
            width={600}
        >
            <Spin spinning={loading}>
                <List
                    dataSource={sortedBankAccounts}
                    renderItem={(bankAccount) => (
                        <List.Item
                            style={{
                                background: bankAccount.isDefault ? '#f0f8ff' : 'transparent',
                                borderRadius: '8px',
                                marginBottom: '8px',
                                padding: '12px',
                            }}
                            actions={[
                                <Button
                                    type={bankAccount.bankAccountId === selectedBankAccountId ? "primary" : "default"}
                                    disabled={bankAccount.bankAccountId === selectedBankAccountId}
                                    onClick={() => onSelect(bankAccount)}
                                >
                                    Select
                                </Button>,
                                <Button
                                    icon={<EditOutlined/>}
                                    onClick={() => handleEditBank(bankAccount)}
                                >
                                    Edit
                                </Button>,
                                <Popconfirm
                                    title="Are you sure you want to remove this bank account?"
                                    onConfirm={() => handleRemoveBank(bankAccount.bankAccountId!)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button
                                        icon={<DeleteOutlined/>}
                                        danger
                                    >
                                        Remove
                                    </Button>
                                </Popconfirm>
                            ]}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Image
                                        src={bankAccount.bankLogo || 'N/A'}
                                        alt={bankAccount.bankName || 'N/A'}
                                        width={40}
                                        style={{objectFit: 'contain'}}
                                    />
                                }
                                title={
                                <Typography.Text strong>
                                    {bankAccount.bankName}
                                    {bankAccount.isDefault && (
                                        <Typography.Text type="success" style={{marginLeft: '8px'}}>
                                            (Default)
                                        </Typography.Text>
                                    )}
                                </Typography.Text>}
                                description={
                                    <>
                                        <Typography.Text>{bankAccount.bankAccountNumber} - {bankAccount.bankAccountName}</Typography.Text>
                                    </>
                                }
                            />
                        </List.Item>
                    )}
                />
                <Button
                    type="dashed"
                    onClick={handleAddNewBank}
                    style={{width: "100%", marginTop: 16}}
                    icon={<PlusOutlined/>}
                >
                    Add New Bank Account
                </Button>
            </Spin>

            <Modal
                title={<Typography.Text
                    strong>{editingBankAccount ? "Edit Bank Account" : "Add New Bank Account"}</Typography.Text>}
                open={showBankForm}
                onCancel={handleBankFormCancel}
                footer={null}
                width={400}
            >
                <BankForm
                    initialValues={editingBankAccount || undefined}
                    onFinish={handleBankFormSubmit}
                    onCancel={handleBankFormCancel}
                    isAddingNew={!editingBankAccount}
                    loading={formLoading}
                />
            </Modal>
        </Modal>
    );
};