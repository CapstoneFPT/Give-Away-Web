import {UpdateBankAccountRequest} from "../../api";
import React, {useEffect, useState} from "react";
import {Button, Checkbox, Form, Image, Input, Select, Space, Tooltip} from "antd";
import * as axios from "axios";
import {AxiosResponse} from "axios";

interface BankFormProps {
    initialValues?: UpdateBankAccountRequest;
    onFinish: (values: UpdateBankAccountRequest) => void;
    onCancel: () => void;
    isAddingNew: boolean;
    loading: boolean;
}

interface VietQRBankListResponse {
    id: number,
    name: string,
    code: string,
    bin: string,
    logo: string,
    shortName: string,
    transferSupported: number,
    lookupSupported: number
}

interface VietQRApiResponse<T> {
    code: string,
    desc: string,
    data: T
}

export const BankForm: React.FC<BankFormProps> = ({
                                                      initialValues, onFinish, onCancel, isAddingNew, loading
                                                  }) => {
    const [form] = Form.useForm<UpdateBankAccountRequest>();
    const [vietQrBanks, setVietQrBanks] = useState<VietQRBankListResponse[]>([]);

    useEffect(() => {
        console.log("Is adding new ", isAddingNew);
        console.log("Initial values", initialValues);
        fetchBanks();
        if (isAddingNew) {
            form.resetFields();
        } else if (initialValues) {
            form.setFieldsValue(initialValues);
        }
    }, [initialValues, form, isAddingNew]);
    const fetchBanks = async () => {
        try {
            const response : AxiosResponse<VietQRApiResponse<VietQRBankListResponse[]>> = await axios.default.get('https://api.vietqr.io/v2/banks');
            console.log(response);
            setVietQrBanks(response.data.data || []);
        } catch (error) {
            console.error(error);
            setVietQrBanks([]);
        }
    }

    const fuzzySearch = (query: string, text: string): boolean => {
        const queryChars = query.toLowerCase().split('');
        let textIndex = 0;
        for (const char of queryChars) {
            textIndex = text.toLowerCase().indexOf(char, textIndex);
            if (textIndex === -1) return false;
            textIndex++;
        }
        return true;
    };
    const handleBankChange = (value: string) => {
        const selectedBank = vietQrBanks.find(bank => bank.shortName === value);
        if (selectedBank) {
            form.setFieldsValue({
                bankName: selectedBank.shortName,
                bankLogo: selectedBank.logo,
            });
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={initialValues || {}}
        >
            <Form.Item
                name="bankName"
                label="Bank Name"
                rules={[{ required: true, message: 'Please select a bank' }]}
            >
                <Select
                    showSearch
                    placeholder="Select a bank"
                    optionFilterProp="children"
                    onChange={handleBankChange}
                    style={{
                        height: '40px',
                    }}
                    filterOption={(input, option) => {
                        const bank = vietQrBanks.find(b => b.shortName === option?.value);
                        if (bank) {
                            return fuzzySearch(input, bank.name) || fuzzySearch(input, bank.shortName);
                        }
                        return false;
                    }}
                    dropdownRender={(menu) => (
                        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {menu}
                        </div>
                    )}
                >
                    {vietQrBanks.map((bank) => (
                        <Select.Option key={bank.bin} value={bank.shortName}>
                            <Tooltip title={`${bank.name} (${bank.shortName})`}>
                                <Space>
                                    <img src={bank.logo} alt={bank.name} style={{ width: 60, height: 40, objectFit: 'contain' }} />
                                    <span style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {bank.name}
                                    </span>
                                </Space>
                            </Tooltip>
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name="bankLogo"
                label="Bank Logo URL"
                hidden={true}
                rules={[{ required: true, message: 'Bank logo URL is required' }]}
            >
                <Input readOnly />
            </Form.Item>
            <Form.Item
                label="Bank Account Name"
                name="bankAccountName"
                rules={[{required: true, message: 'Please input your bank account name!'},{
                    pattern: new RegExp(/^[a-zA-Z\s]+$/),
                    message: "Invalid bank account name",
                }]}
            >
                <Input onInput={(e) => (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.toUpperCase()}/>
            </Form.Item>
            <Form.Item
                label="Bank Account Number"
                name="bankAccountNumber"
                rules={[{required: true, message: 'Please input your bank account number!'},{
                    pattern: new RegExp(/^[0-9]+$/),
                    message: "Invalid bank account number",
                }]}
            >
                <Input type="text"/>
            </Form.Item>
            {
                !isAddingNew &&
                <Form.Item
                    name="isDefault"
                    valuePropName="checked"
                    label="Set as default"
                >
                    <Checkbox/>
                </Form.Item>
            }
            <Form.Item>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button
                        onClick={onCancel}
                        style={{marginRight: 8}}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                    >
                        Save
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
};


