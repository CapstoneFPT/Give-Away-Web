import React, {useState} from 'react';
import {Button, Image, List, Modal, notification, Popconfirm, Spin} from 'antd';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import {BankAccountsListResponse} from '../../api';
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

    const handleBankFormSubmit = async (values: any) => {
        setFormLoading(true);
        try {
            if (editingBankAccount) {
                await onEditBankAccount({...values, bankAccountId: editingBankAccount.bankAccountId});
            } else {
                await onAddNewBankAccount(values);
            }
            setShowBankForm(false);
            setEditingBankAccount(null);
            notification.success({
                message: 'Success',
                description: 'Bank account saved successfully.',
            })
        } catch (error) {
            console.error('Error submitting bank form:', error);
            notification.error({
                message: 'Error',
                description: 'Failed to save bank account. Please try again.',
            });
        } finally {
            setFormLoading(false);
        }
    };

    const handleRemoveBank = async (bankAccountId: string) => {
      onRemoveBankAccount(bankAccountId);
    };

    return (
        <Modal
            title="Select Bank Account"
            open={visible}
            onCancel={onCancel}
            footer={null}
        >
            <Spin spinning={loading}>
                <List
                    dataSource={bankAccounts}
                    renderItem={(bankAccount) => (
                        <List.Item
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
                                avatar={<Image src={bankAccount.bankLogo || 'N/A'} alt={bankAccount.bankName || 'N/A'}
                                               width={40}/>}
                                title={bankAccount.bankName}
                                description={`${bankAccount.bankAccountNumber} - ${bankAccount.bankAccountName}`}
                            />
                            {bankAccount.isDefault && <span style={{color: 'green'}}>Default</span>}
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
                title={editingBankAccount ? "Edit Bank Account" : "Add New Bank Account"}
                open={showBankForm}
                onCancel={handleBankFormCancel}
                footer={null}
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