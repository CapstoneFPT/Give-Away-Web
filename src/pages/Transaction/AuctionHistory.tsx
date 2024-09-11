import React, { useState } from 'react';
import { Table, Input, Select, Card, Row, Col, Button, Tag } from 'antd';
import { AuctionStatus, AccountApi, AuctionListResponse } from '../../api';
import NavProfile from '../../components/NavProfile/NavProfile';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getAuctionStatus } from '../../utils/types';

const { Option } = Select;

const AuctionHistory: React.FC = () => {
  const userId = JSON.parse(localStorage.getItem("userId") || "null");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [statuses, setStatuses] = useState<AuctionStatus[]>([]);
  const [itemCode, setItemCode] = useState('');
  const [auctionCode, setAuctionCode] = useState('');
  const [title, setTitle] = useState('');
  const [isWon, setIsWon] = useState<boolean | undefined>(undefined);

  const fetchAuctions = async () => {
    const accountApi = new AccountApi();
    const response = await accountApi.apiAccountsAccountIdAuctionsGet(
      userId!,
      page,
      pageSize,
      itemCode || undefined,
      auctionCode || undefined,
      isWon,
      title || undefined,
      statuses.length > 0 ? statuses : undefined
    );
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['auctions', userId, page, pageSize, itemCode, auctionCode, isWon, title, statuses],
    queryFn: fetchAuctions
  });

  const columns = [
    {
      title: 'Auction Code',
      dataIndex: 'auctionCode',
      key: 'auctionCode',
    },
    {
      title: 'Item Code',
      dataIndex: 'itemCode',
      key: 'itemCode',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: 'Deposit Fee',
      dataIndex: 'depositFee',
      key: 'depositFee',
      render: (amount: number) => <strong>{formatBalance(amount)} VND</strong>,
      
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text: any, record: any) => ( // Sửa lại để sử dụng hàm render đúng cách
        <Tag
          style={{ marginBottom: "10px" }}
          color={getAuctionStatus(record.status)}
        >
          {record.status}
        </Tag>
      ),
    },
    {
      title: 'Won',
      dataIndex: 'isWon',
      key: 'isWon',
      render: (isWon: boolean | null) => isWon === null ? 'N/A' : isWon ? 'Yes' : 'No',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text :string, record : AuctionListResponse) => (
        <Link to={`/auction-detail/${record.auctionId}`}>
          <Button style={{backgroundColor:'black',color:'white'}} type="primary">View Details</Button>
        </Link>
      ),
    },
  ];

  const handleStatusChange = (selectedStatuses: AuctionStatus[]) => {
    setStatuses(selectedStatuses);
    setPage(1);
  };
  const formatBalance = (price: number): string => {
    return new Intl.NumberFormat("de-DE").format(price);
  };
  const handleTableChange = (pagination: any) => {
    setPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  if (error) {
    return <div>Error loading auctions</div>;
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
              Auction History
            </h3>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={8}>
                <Input
                  placeholder="Auction Code"
                  value={auctionCode}
                  onChange={(e) => setAuctionCode(e.target.value)}
                />
              </Col>
              <Col span={8}>
                <Input
                  placeholder="Item Code"
                  value={itemCode}
                  onChange={(e) => setItemCode(e.target.value)}
                />
              </Col>
              <Col span={8}>
                <Input
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={12}>
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Select auction statuses"
                  onChange={handleStatusChange}
                >
                  {Object.values(AuctionStatus).filter(value => value === 'Finished' || value === 'OnGoing').map((status) => (
                    <Option key={status} value={status}>
                      {status}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col span={12}>
                <Select
                  style={{ width: '100%' }}
                  placeholder="Won Status"
                  onChange={(value) => setIsWon(value === 'true' ? true : value === 'false' ? false : undefined)}
                >
                  <Option value="true">Won</Option>
                  <Option value="false">Not Won</Option>
                  <Option value="">All</Option>
                </Select>
              </Col>
            </Row>
            <Table
              columns={columns}
              dataSource={data?.items || []}
              rowKey="auctionId"
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

export default AuctionHistory;
