import React, {useEffect, useState} from "react";
import {AccountApi, GetTransactionsResponse, TransactionType} from "../../api";
import {Card, Col, Row, Table, TableColumnsType} from "antd";
import NavProfile from "../../components/NavProfile/NavProfile.tsx";

const PurchaseHistory = () => {
    const userId = JSON.parse(localStorage.getItem("userId") || "null");

    const [data,setData] = useState<GetTransactionsResponse[]>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const accountApi = new AccountApi();
            const response  = await accountApi.apiAccountsAccountIdTransactionsGet(userId!,page,10,TransactionType.Purchase);
            console.log(response.data.items)
            setData(response.data.items || []);
        }

        fetchData();
    }, [userId,page]);

    const columns : TableColumnsType<GetTransactionsResponse> = [
        {
            title: 'Id',
            dataIndex: 'transactionId',
            key: 'transactionId',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Date',
            dataIndex: 'createdDate',
            key: 'createdDate',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
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
                            Withdraw history
                        </h3>
                        <Table
                            dataSource={data}
                            columns={columns}
                            rowKey="id"
                            pagination={{ pageSize: 10 }}
                            style={{ marginTop: '20px' }}
                        />
                    </Card>
                </Col>
            </Row>
        </Card>
    );
}

export default PurchaseHistory;