import React, {useEffect, useState} from "react";
import {Card, Col, Row, Table} from "antd";
import NavProfile from "../../components/NavProfile/NavProfile";
import {AccountApi, GetWithdrawsResponse} from "../../api";

const WithdrawHistory = () => {
    const userId = JSON.parse(localStorage.getItem("userId") || "null");
    console.log(userId);

    const [data, setData] = useState<GetWithdrawsResponse[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await axios.get(`${BASE_URL}/accounts/${userId}/withdraws`);
                const accountApi = new AccountApi();
                const response = await accountApi.apiAccountsAccountIdWithdrawsGet(userId);
                const transactions = response.data.items; // Extracting transactions array from the response object
                setData(transactions || []);
                console.log(transactions)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [userId]);
    const formatBalance = (balance: any) => {
        return new Intl.NumberFormat('de-DE').format(balance);
    };
    const columns = [
        {
            title: 'Bank Name ',
            dataIndex: 'bankAccountName',
            key: 'bankAccountName',
        },
        {
            title: 'Amount ',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount: number) => <strong>{formatBalance(amount)} VND</strong>,
        },

        {
            title: 'Created Date ',
            dataIndex: 'createdDate',
            key: 'createdDate',
            render: (createdDate: string) => new Date(createdDate).toLocaleString(),
        },
        {
            title: 'Bank Account ',
            dataIndex: 'bankAccountNumber',
            key: 'bankAccountNumber',
        },

        {
            title: 'Bank ',
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
                            pagination={{pageSize: 4}}
                            style={{marginTop: '20px'}}
                        />
                    </Card>
                </Col>
            </Row>
        </Card>
    );
}

export default WithdrawHistory;
