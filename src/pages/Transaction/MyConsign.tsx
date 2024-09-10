import React, { useState } from "react";
import { Card, Row, Col, Table, Button, Tag, Input, Select, DatePicker } from "antd";
import NavProfile from "../../components/NavProfile/NavProfile";
import { useNavigate } from "react-router-dom";
import useConsignSales from "../../hooks/useConsignSales";
import { ConsignSaleListResponse, ConsignSaleStatus, ConsignSaleType } from "../../api";
import { ColumnsType } from "antd/es/table";

const { Option } = Select;
const { RangePicker } = DatePicker;

const MyConsign = () => {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("userId") || "null");
  const [queryParams, setQueryParams] = useState({
    pageNumber: 1,
    pageSize: 10,
    shopId: undefined,
    consignSaleCode: undefined,
    status: undefined,
    type: undefined,
    startDate: undefined,
    endDate: undefined,
  });

  const { data, isLoading, error } = useConsignSales({
    accountId: userId,
    ...queryParams,
  });

  const handleSearch = (changedValues: any, allValues: any) => {
    setQueryParams(prev => ({
      ...prev,
      ...allValues,
      pageNumber: 1,
    }));
  };

  const handleTableChange = (pagination: any) => {
    setQueryParams(prev => ({
      ...prev,
      pageNumber: pagination.current,
      pageSize: pagination.pageSize,
    }));
  };

  const columns : ColumnsType<ConsignSaleListResponse> = [
    {
      title: 'ConsignSale Code',
      dataIndex: 'consignSaleCode',
      key: 'consignSaleCode',
    },
    {
      title: 'Consginer',
      dataIndex: 'consginor',
      key: 'consignor',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (totalPrice: number) => <strong>{formatBalance(totalPrice)} VND</strong>,
    },
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (createdDate: string) => new Date(createdDate).toLocaleString(),
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (startDate: string) => new Date(startDate).getUTCFullYear() == 1970 ? "N/A" : new Date(startDate).toLocaleString(),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (endDate: string) => new Date(endDate).getUTCFullYear() == 1970 ? "N/A" : new Date(endDate).toLocaleString(),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'ConsignSale Method',
      dataIndex: 'consignSaleMethod',
      key: 'consignSaleMethod',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag
          color={
            status === "Completed"
              ? "green"
              : status === "AwaitingDelivery"
              ? "yellow"
              : status === "Pending"
              ? "pink"
              : status === "Received"
              ? "orange"
              : status === "OnSale"
              ? "blue"
              : "red"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) => (
        <Button 
          style={{ backgroundColor: 'black', borderColor: 'black', width: '100px', height: '35px', color: 'white' }} 
          onClick={() => handleDetail(record.consignSaleId)}
        >
          Detail
        </Button>
      ),
    },
  ];

  const handleDetail = (consignSaleId: string) => {
    navigate(`/transaction/My-consign/${consignSaleId}`);
  };

  const formatBalance = (balance: any) => {
    return new Intl.NumberFormat('de-DE').format(balance);
  };

  if (error) {
    return <div>Error loading consign sales</div>;
  }

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
              Consign history
            </h3>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={8}>
                <Input
                  placeholder="Consign Sale Code"
                  value={queryParams.consignSaleCode}
                  onChange={(e) => handleSearch({ consignSaleCode: e.target.value }, { ...queryParams, consignSaleCode: e.target.value })}
                />
              </Col>
              <Col span={8}>
                <Select
                  style={{ width: '100%' }}
                  placeholder="Select status"
                  value={queryParams.status}
                  onChange={(value) => handleSearch({ status: value }, { ...queryParams, status: value })}
                >
                  {Object.values(ConsignSaleStatus).map((status) => (
                    <Option key={status} value={status}>
                      {status}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col span={8}>
                <Select
                  style={{ width: '100%' }}
                  placeholder="Select type"
                  value={queryParams.type}
                  onChange={(value) => handleSearch({ type: value }, { ...queryParams, type: value })}
                >
                  {Object.values(ConsignSaleType).map((type) => (
                    <Option key={type} value={type}>
                      {type}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={24}>
                <RangePicker
                  style={{ width: '100%' }}
                  onChange={(dates, dateStrings) => {
                    const startDate = dates?.[0]?.format();
                    const endDate = dates?.[1]?.format();
                    handleSearch(
                      { startDate, endDate },
                      { ...queryParams, startDate, endDate }
                    );
                  }}
                />
              </Col>
            </Row>
            <Table
              dataSource={data?.items || []}
              columns={columns}
              rowKey="consignSaleId"
              loading={isLoading}
              pagination={{
                current: queryParams.pageNumber,
                pageSize: queryParams.pageSize,
                total: data?.totalCount,
                showSizeChanger: true,
                showQuickJumper: true,
              }}
              onChange={handleTableChange}
              style={{ marginTop: '20px' }}
            />
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default MyConsign;