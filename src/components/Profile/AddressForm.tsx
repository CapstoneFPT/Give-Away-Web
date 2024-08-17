import React, { useState, useEffect } from 'react';
import { Form, Input, Select, FormInstance } from 'antd';
import {AddressApi, GHNDistrictResponse, GHNProvinceResponse, GHNWardResponse} from '../../api';

interface AddressFormProps {
    form: FormInstance;
}

const AddressForm: React.FC<AddressFormProps> = ({ form }) => {
    const [provinces, setProvinces] = useState<GHNProvinceResponse[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<number | null>(null);
    const [districts, setDistricts] = useState<GHNDistrictResponse[]>([]);
    const [wards, setWards] = useState<GHNWardResponse[]>([]);

    useEffect(() => {
        fetchProvinces();
    }, []);

    const fetchProvinces = async () => {
        try {
            const addressApi = new AddressApi();
            const provincesResponse = await addressApi.apiAddressesProvincesGet();
            setProvinces(provincesResponse.data.data || []);
        } catch (error) {
            console.error('Error fetching provinces:', error);
        }
    };

    const handleSelectProvince = async (provinceId: number) => {
        setSelectedProvince(provinceId);
        console.log(provinceId);
        try {
            const addressApi = new AddressApi();
            const districtResponse = await addressApi.apiAddressesDistrictsGet(
                provinceId
            );
            setDistricts(districtResponse.data.data!);
        } catch (error) {
            console.error("Error fetching districts:", error);
        }
    };

    const handleSelectDistricts = async (districtsId: number) => {
        setSelectedProvince(districtsId);
        console.log(districtsId);
        try {
            const addressApi = new AddressApi();
            const wardResponse = await addressApi.apiAddressesWardsGet(districtsId);
            setWards(wardResponse.data.data!);
        } catch (error) {
            console.error("Error fetching districts:", error);
        }
    };

    return (
        <Form form={form} layout="vertical">
            <Form.Item
                name="recipientName"
                label="Recipient Name"
                rules={[{ required: true, message: 'Please input your recipient name!' }]}
            >
                <Input placeholder="Recipient Name" />
            </Form.Item>
            <Form.Item
                name="phone"
                label="Phone"
                rules={[
                    { required: true, message: 'Please input your phone!' },
                    { pattern: /^[0-9]+$/, message: 'Please enter a valid phone number!' },
                ]}
            >
                <Input placeholder="Phone" />
            </Form.Item>
            <Form.Item
                name="ghnProvinceId"
                label="Province"
                rules={[{ required: true, message: 'Please select your province!' }]}
            >
                <Select
                    showSearch
                    placeholder="Select a province"
                    filterOption={(input, option) =>
                        (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                    }
                    onChange={handleSelectProvince}
                >
                    {provinces.map((province) => (
                        <Select.Option key={province.provinceId} value={province.provinceId}>
                            {province.provinceName}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name="ghnDistrictId"
                label="District"
                rules={[{ required: true, message: "Please select a district" }]}
            >
                <Select
                    showSearch
                    placeholder="Select a district"
                    onChange={handleSelectDistricts}
                    filterOption={(input, option) =>
                        (option?.children as unknown as string)
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }
                >
                    {districts.map((district) => (
                        <Select.Option
                            key={district.districtId}
                            value={district.districtId}
                        >
                            {district.districtName}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name="ghnWardCode"
                label="Ward"
                rules={[{ required: true, message: "Please select a ward" }]}
            >
                <Select
                    showSearch
                    placeholder="Select a ward"
                    filterOption={(input, option) =>
                        (option?.children as unknown as string)
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }
                >
                    {wards.map((ward) => (
                        <Select.Option key={ward.wardCode} value={ward.wardCode}>
                            {ward.wardName}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name="residence"
                label="Address"
                rules={[
                    { required: true, message: 'Please input your phone!' },
                ]}
            >
                <Input placeholder="Address" />
            </Form.Item>
        </Form>
    );
};

export default AddressForm;