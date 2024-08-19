import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Form, Input, Select} from 'antd';
import {
    AddressApi,
    GHNDistrictResponse,
    GHNProvinceResponse,
    GHNWardResponse,
    UpdateDeliveryRequest
} from '../../api';

interface AddressFormProps {
    initialValues?: UpdateDeliveryRequest;
    onFinish: (values: UpdateDeliveryRequest) => void;
    onCancel: () => void;
    isAddingNew: boolean;
    loading: boolean;
}

const AddressForm: React.FC<AddressFormProps> = ({initialValues, onFinish, onCancel, isAddingNew, loading}) => {
    const [form] = Form.useForm<UpdateDeliveryRequest>();
    const [provinces, setProvinces] = useState<GHNProvinceResponse[]>([]);
    const [districts, setDistricts] = useState<GHNDistrictResponse[]>([]);
    const [wards, setWards] = useState<GHNWardResponse[]>([]);

    useEffect(() => {
        console.log("Is adding new ", isAddingNew);
        console.log("Initial values", initialValues);
        fetchProvinces();
        if (isAddingNew) {
            form.resetFields();
        } else if (initialValues) {
            form.setFieldsValue(initialValues);
            if (initialValues.ghnProvinceId) {
                fetchDistricts(initialValues.ghnProvinceId);
            }
            if (initialValues.ghnDistrictId) {
                fetchWards(initialValues.ghnDistrictId);
            }
        }
    }, [initialValues, form, isAddingNew]);

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

    const handleProvinceChange = async (value: number) => {
        form.setFieldsValue({ghnDistrictId: undefined, ghnWardCode: undefined});
        await fetchDistricts(value);
    };

    const handleDistrictChange = async (value: number) => {
        form.setFieldsValue({ghnWardCode: undefined});
        await fetchWards(value);
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={initialValues || {}}
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
                name="ghnProvinceId"
                label="Province"
                rules={[{required: true, message: 'Please select province!'}]}
            >
                <Select onChange={handleProvinceChange}
                        value={initialValues?.ghnProvinceId}>
                    {provinces.map(province => (
                        <Select.Option key={province.provinceId} value={province.provinceId}>
                            {province.provinceName}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name="ghnDistrictId"
                label="District"
                rules={[{required: true, message: 'Please select district!'}]}
            >
                <Select onChange={handleDistrictChange}
                        value={initialValues?.ghnDistrictId}>
                    {districts.map(district => (
                        <Select.Option key={district.districtId} value={district.districtId}>
                            {district.districtName}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name="ghnWardCode"
                label="Ward"
                rules={[{required: true, message: 'Please select ward!'}]}
            >
                <Select value={initialValues?.ghnWardCode}>
                    {wards.map(ward => (
                        <Select.Option key={ward.wardCode} value={ward.wardCode}>
                            {ward.wardName}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name="residence"
                label="Address Detail"
                rules={[{required: true, message: 'Please input address detail!'}]}
            >
                <Input.TextArea/>
            </Form.Item>
            <Form.Item
                name="addressType"
                valuePropName="addressType"
                label="Address Type"
                rules={
                    [
                        {
                            required: true,
                            message: 'Please select address type!',
                        }
                    ]
                }>
                <Select value={initialValues?.addressType}>
                    <Select.Option value="Home">Home</Select.Option>
                    <Select.Option value="Business">Business</Select.Option>
                </Select>
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
                <Button loading={loading} type="primary" htmlType="submit">
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