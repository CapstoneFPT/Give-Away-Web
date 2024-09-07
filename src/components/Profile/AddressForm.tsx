import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input, Select, Spin } from 'antd';
import { UpdateDeliveryRequest } from '../../api';
import { useDistricts, useProvinces, useWards } from '../../hooks/addressHooks';

interface AddressFormProps {
    initialValues?: UpdateDeliveryRequest;
    onFinish: (values: UpdateDeliveryRequest) => void;
    onCancel: () => void;
    isAddingNew: boolean;
    loading: boolean;
}

const AddressForm: React.FC<AddressFormProps> = ({
    initialValues,
    onFinish,
    onCancel,
    isAddingNew,
    loading
}) => {
    const [form] = Form.useForm<UpdateDeliveryRequest>();
    const { data: provinces, isLoading: isLoadingProvinces } = useProvinces();
    const { data: districts, isLoading: isLoadingDistricts } = useDistricts(form.getFieldValue('ghnProvinceId'));
    const { data: wards, isLoading: isLoadingWards } = useWards(form.getFieldValue('ghnDistrictId'));

    useEffect(() => {
        if (isAddingNew) {
            form.resetFields();
        } else if (initialValues) {
            form.setFieldsValue({
                ...initialValues,
                residence: initialValues.residence?.split(',')[0]
            });
        }
    }, [form, initialValues, isAddingNew]);

    const handleProvinceChange = (value: number) => {
        form.setFieldsValue({ ghnDistrictId: undefined, ghnWardCode: undefined });
        console.log(value)
        console.log(form.getFieldValue('ghnProvinceId'))
        
    };

    const handleDistrictChange = (value: number) => {
        form.setFieldsValue({ ghnWardCode: undefined });
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={initialValues}
        >
            <Form.Item
                name="recipientName"
                label="Recipient Name"
                rules={[{ required: true, message: 'Please input recipient name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="phone"
                label="Phone"
                rules={[
                    { required: true, message: 'Please input phone number!' },
                    { pattern: /^[0-9]+$/, message: 'Please enter a valid phone number!' },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="ghnProvinceId"
                label="Province"
                rules={[{ required: true, message: 'Please select province!' }]}
            >
                <Select 
                    onChange={handleProvinceChange}
                    loading={isLoadingProvinces}
                    disabled={isLoadingProvinces}
                >
                    {provinces?.map(province => (
                        <Select.Option key={province.provinceId} value={province.provinceId}>
                            {province.provinceName}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name="ghnDistrictId"
                label="District"
                rules={[{ required: true, message: 'Please select district!' }]}
            >
                <Select 
                    onChange={handleDistrictChange}
                    loading={isLoadingDistricts}
                    disabled={isLoadingDistricts || !form.getFieldValue('ghnProvinceId')}
                >
                    {districts?.map(district => (
                        <Select.Option key={district.districtId} value={district.districtId}>
                            {district.districtName}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name="ghnWardCode"
                label="Ward"
                rules={[{ required: true, message: 'Please select ward!' }]}
            >
                <Select
                    loading={isLoadingWards}
                    disabled={isLoadingWards || !form.getFieldValue('ghnDistrictId')}
                >
                    {wards?.map(ward => (
                        <Select.Option key={ward.wardCode} value={ward.wardCode}>
                            {ward.wardName}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name="residence"
                label="Address Detail"
                rules={[{ required: true, message: 'Please input address detail!' }]}
            >
                <Input.TextArea />
            </Form.Item>
            <Form.Item
                name="addressType"
                label="Address Type"
                rules={[{ required: true, message: 'Please select address type!' }]}
            >
                <Select>
                    <Select.Option value="Home">Home</Select.Option>
                    <Select.Option value="Business">Business</Select.Option>
                </Select>
            </Form.Item>
            {!isAddingNew && (
                <Form.Item
                    name="isDefault"
                    valuePropName="checked"
                    label="Set as default"
                >
                    <Checkbox />
                </Form.Item>
            )}
            <Form.Item>
                <Button loading={loading} type="primary" htmlType="submit">
                    {isAddingNew ? 'Add' : 'Update'} Address
                </Button>
                <Button onClick={onCancel} style={{ marginLeft: 8 }}>
                    Cancel
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddressForm;