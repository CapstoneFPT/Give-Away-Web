import React, { useState } from 'react';
import { Table, Input, Select, Card, Row, Col, Tag } from 'antd';
import { GetTransactionsResponse, TransactionType } from '../../api';
import useTransactions from '../../hooks/useTransactions';
import NavProfile from '../../components/NavProfile/NavProfile';
import { ColumnsType } from 'antd/es/table';
import { getTransactionType } from '../../utils/types';

const { Option } = Select;

const TransactionHistory: React.FC = () => {
  const userId = JSON.parse(localStorage.getItem("userId") || "null");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [types, setTypes] = useState<TransactionType[]>([]);
  const [orderCode, setOrderCode] = useState('');
  const [consignSaleCode, setConsignSaleCode] = useState('');
  const [rechargeCode, setRechargeCode] = useState('');
  const [depositCode, setDepositCode] = useState('');
  const [transactionCode, setTransactionCode] = useState('');

  const { data, isLoading, error } = useTransactions({
    accountId: userId,
    page,
    pageSize,
    types,
    orderCode,
    consignSaleCode,
    rechargeCode,
    depositCode,
    transactionCode,
  });

  const columns : ColumnsType<GetTransactionsResponse> = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      render: (text: string, record: any) => {
        if (record.orderCode) return record.orderCode;
        if (record.consignSaleCode) return record.consignSaleCode;
        if (record.rechargeCode) return record.rechargeCode;
        if (record.depositCode) return record.depositCode;
      },
    },
    {
      title: 'Transaction Code',
      dataIndex: 'transactionCode',
      key: 'transactionCode',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `${formatBalance(amount)} VND`,
    },
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: 'Reciver',
      dataIndex: 'ReciverBalance',
      key: 'Reciver',
     
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string, record: any) => ( // Sửa lại để sử dụng hàm render đúng cách
        <Tag
          style={{ marginBottom: "10px" }}
          color={getTransactionType(record.type)}
        >
          {record.type}
        </Tag>
      ),
    },
  ];

  const handleTypeChange = (selectedTypes: TransactionType[]) => {
    setTypes(selectedTypes);
    setPage(1);
  };

  const handleTableChange = (pagination: any) => {
    setPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  if (error) {
    return <div>Error loading transactions</div>;
  }
  const formatBalance = (price: number): string => {
    return new Intl.NumberFormat("de-DE").format(price);
  };

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
            <h3
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              Transaction History
            </h3>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <Input
                  placeholder="Transaction Code"
                  value={transactionCode}
                  onChange={(e) => {
                    setTransactionCode(e.target.value);
                    setOrderCode('');
                    setConsignSaleCode('');
                    setRechargeCode('');
                    setDepositCode('');
                  }}
                />
              </Col>
              <Col span={6}>
                <Input
                  placeholder="Order Code"
                  value={orderCode}
                  onChange={(e) => {
                    setOrderCode(e.target.value);
                    setConsignSaleCode('');
                    setRechargeCode('');
                    setDepositCode('');
                  }}
                />
              </Col>
              <Col span={6}>
                <Input
                  placeholder="Consign Sale Code"
                  value={consignSaleCode}
                  onChange={(e) => {
                    setConsignSaleCode(e.target.value);
                    setOrderCode('');
                    setRechargeCode('');
                    setDepositCode('');
                  }}
                />
              </Col>
              <Col span={6}>
                <Input
                  placeholder="Recharge Code"
                  value={rechargeCode}
                  onChange={(e) => {
                    setRechargeCode(e.target.value);
                    setOrderCode('');
                    setConsignSaleCode('');
                    setDepositCode('');
                  }}
                />
              </Col>
              <Col span={6}>
                <Input
                  placeholder="Deposit Code"
                  value={depositCode}
                  onChange={(e) => {
                    setDepositCode(e.target.value);
                    setOrderCode('');
                    setConsignSaleCode('');
                    setRechargeCode('');
                  }}
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={24}>
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Select transaction types"
                  onChange={handleTypeChange}
                >
                  {Object.values(TransactionType).map((type) => (
                    <Option key={type} value={type}>
                      {type}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Table
              columns={columns}
              dataSource={data?.items || []}
              rowKey="transactionId"
              loading={isLoading}
              pagination={{
                current: page,
                pageSize: pageSize,
                total: data?.totalCount,
                showSizeChanger: true,
                showQuickJumper: true,
              }}
              onChange={handleTableChange}
            />
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default TransactionHistory;
