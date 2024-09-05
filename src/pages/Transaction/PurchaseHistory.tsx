import React, {useEffect, useState} from "react";
import {AccountApi, GetTransactionsResponse} from "../../api";
import {Card, Col, Row, Table, TableColumnsType} from "antd";
import NavProfile from "../../components/NavProfile/NavProfile.tsx";

const PurchaseHistory = () => {
    const userId = JSON.parse(localStorage.getItem("userId") || "null");

    const [data, setData] = useState<GetTransactionsResponse[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [userId]);
    const fetchData = async (page = 1, size = 10) => {
        const accountApi = new AccountApi();
        const response = await accountApi.apiAccountsAccountIdTransactionsGet(userId!, page, size, ["Purchase"]);
        console.log(`Purchased transaction from ${userId}`, response.data.items)
        setData(response.data.items || []);
        setTotal(response.data.totalCount || 0);
        setLoading(false);
    }
    const formatBalance = (balance: number) => {
        return new Intl.NumberFormat('de-DE').format(balance);
    };

    const columns: TableColumnsType<GetTransactionsResponse> = [
        {
            title: 'Order Code',
            dataIndex: 'orderCode',
            key: 'orderCode',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount: number) => <strong>{formatBalance(amount)} VND</strong>,

        },
        {
            title: 'Date',
            dataIndex: 'createdDate',
            key: 'createdDate',
            render: (createdDate: string) => new Date(createdDate).toLocaleDateString(),
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },


    ]

    return (
        <Card>
            <Row gutter={[16, 16]}>
                <Col span={5}>
                    <NavProfile/>
                </Col>
                <Col span={19}>
                    <Card
                        style={{
                            borderRadius: "10px",
                            boxShadow: "2px 2px 7px #cbc1c1",
                        }}
                    >
                        <h3
                            style={{
                                fontSize: "40px",
                                fontWeight: "bold",
                                textAlign: "center",
                                marginBottom: "10px",
                            }}
                        >
                            Purchase History
                        </h3>
                        <Table
                            dataSource={data}
                            columns={columns}
                            rowKey="id"
                            pagination={{
                                total: total,
                                onChange: (page, pageSize) => {
                                    setLoading(true)
                                    fetchData(page, pageSize)
                                },
                            }}
                            style={{marginTop: '20px'}}
                        />
                    </Card>
                </Col>
            </Row>
        </Card>
    );
}

export default PurchaseHistory;