import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Select} from 'antd';
import {AddressApi, DeliveryRequest, GHNDistrictResponse, GHNProvinceResponse, GHNWardResponse} from '../../api';

interface AddressFormProps {
    initialValues?: DeliveryRequest;
    onFinish: (values: DeliveryRequest) => void;
    onCancel: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({initialValues, onFinish, onCancel}) => {
    const [form] = Form.useForm();
    const [provinces, setProvinces] = useState<GHNProvinceResponse[]>([]);
    const [districts, setDistricts] = useState<GHNDistrictResponse[]>([]);
    const [wards, setWards] = useState<GHNWardResponse[]>([]);

    useEffect(() => {
        fetchProvinces();
        if (initialValues) {
            form.setFieldsValue(initialValues);
        }
    }, [initialValues, form]);

    const fetchProvinces = async () => {
        try {
            const addressApi = new AddressApi();
            const response = await addressApi.apiAddressesProvincesGet();
            setProvinces(response.data.data || []);
        } catch (error) {
            console.error('Error fetching provinces:', error);
        }
    };

    const fetchDistricts = async (provinceId: number) => {
        try {
            const addressApi = new AddressApi();
            const response = await addressApi.apiAddressesDistrictsGet(provinceId);
            setDistricts(response.data.data || []);
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    };

    const fetchWards = async (districtId: number) => {
        try {
            const addressApi = new AddressApi();
            const response = await addressApi.apiAddressesWardsGet(districtId);
            setWards(response.data.data || []);
        } catch (error) {
            console.error('Error fetching wards:', error);
        }
    };

    const handleProvinceChange = (value: number) => {
        form.setFieldsValue({districtId: undefined, wardId: undefined});
        fetchDistricts(value);
    };

    const handleDistrictChange = (value: number) => {
        form.setFieldsValue({wardId: undefined});
        fetchWards(value);
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
                rules={[{required: true, message: 'Please input recipient name!'}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="phone"
                label="Phone"
                rules={[
                    {required: true, message: 'Please input phone number!'},
                    {pattern: /^[0-9]+$/, message: 'Please enter a valid phone number!'},
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="provinceId"
                label="Province"
                rules={[{required: true, message: 'Please select province!'}]}
            >
                <Select onChange={handleProvinceChange}>
                    {provinces.map(province => (
                        <Select.Option key={province.provinceId} value={province.provinceId}>
                            {province.provinceName}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name="districtId"
                label="District"
                rules={[{required: true, message: 'Please select district!'}]}
            >
                <Select onChange={handleDistrictChange}>
                    {districts.map(district => (
                        <Select.Option key={district.districtId} value={district.districtId}>
                            {district.districtName}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name="wardId"
                label="Ward"
                rules={[{required: true, message: 'Please select ward!'}]}
            >
                <Select>
                    {wards.map(ward => (
                        <Select.Option key={ward.wardCode} value={ward.wardCode}>
                            {ward.wardName}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name="addressDetail"
                label="Address Detail"
                rules={[{required: true, message: 'Please input address detail!'}]}
            >
                <Input.TextArea/>
            </Form.Item>
            <Form.Item
                name="addressType"
                valuePropName="addressType">
                <Select>
                    <Select.Option value="Home">Home</Select.Option>
                    <Select.Option value="Business">Business</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {initialValues ? 'Update' : 'Add'} Address
                </Button>
                <Button onClick={onCancel} style={{marginLeft: 8}}>
                    Cancel
                </Button>
            </Form.Item>

        </Form>
    );
};

export default AddressForm;