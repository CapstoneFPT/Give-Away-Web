import React, { useState } from "react";
import { Card, Col, Row, Table, Typography, Input, Select, Space } from "antd";
import NavProfile from "../../components/NavProfile/NavProfile";
import { GetWithdrawsResponse, WithdrawStatus } from "../../api";
import useWithdrawHistory from "../../hooks/useWithdraws";
import { ColumnsType } from "antd/es/table";
import { useAuth } from "../../components/Auth/Auth";

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const WithdrawHistory: React.FC = () => {
    const { currentUser } = useAuth();
    const userId = currentUser?.id || '';
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [status, setStatus] = useState<WithdrawStatus | undefined>(undefined);
    const [searchTerm, setSearchTerm] = useState("");

    const { data, isLoading, error } = useWithdrawHistory({
        accountId: userId,
        page,
        pageSize,
        status,
        withdrawCode: searchTerm,
    });

    const formatBalance = (balance: number) => {
        return new Intl.NumberFormat('de-DE').format(balance);
    };

    const columns : ColumnsType<GetWithdrawsResponse> = [
        {
            title: 'Withdraw Code',
            dataIndex: 'withdrawCode',
            key: 'withdrawCode',
        },
        {
            title: 'Bank Name',
            dataIndex: 'bankAccountName',
            key: 'bankAccountName',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount: number) => <strong>{formatBalance(amount)} VND</strong>,
        },
        {
            title: 'Created Date',
            dataIndex: 'createdDate',
            key: 'createdDate',
            render: (createdDate: string) => new Date(createdDate).toLocaleString(),
        },
        {
            title: 'Bank Account',
            dataIndex: 'bankAccountNumber',
            key: 'bankAccountNumber',
        },
        {
            title: 'Bank',
            dataIndex: 'bank',
            key: 'bank',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ];


    return (
        <Card>
            <Row gutter={[16, 16]}>
                <Col span={5}>
                    <NavProfile />
                </Col>
                <Col span={19}>
                    <Card
                        style={{
                            borderRadius: "10px",
                            boxShadow: "2px 2px 7px #cbc1c1",
                        }}
                    >
                        <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
                            Withdraw History
                        </Title>
                        <Space style={{ marginBottom: 16 }}>
                            <Search
                                placeholder="Search by withdraw code"
                                onSearch={(value) => setSearchTerm(value)}
                                style={{ width: 300 }}
                            />
                            <Select
                                style={{ width: 200 }}
                                placeholder="Filter by status"
                                onChange={(value) => setStatus(value)}
                                allowClear
                            >
                                {Object.values(WithdrawStatus).map((status) => (
                                    <Option key={status} value={status}>
                                        {status}
                                    </Option>
                                ))}
                            </Select>
                        </Space>
                        <Table
                            dataSource={data?.items || []}
                            columns={columns}
                            rowKey="withdrawId"
                            loading={isLoading}
                            pagination={{
                                current: page,
                                pageSize: pageSize,
                                total: data?.totalCount,
                                onChange: (page, pageSize) => {
                                    setPage(page);
                                    setPageSize(pageSize);
                                },
                            }}
                        />
                        {error && <p>Error: {(error as Error).message}</p>}
                    </Card>
                </Col>
            </Row>
        </Card>
    );
};

export default WithdrawHistory;
