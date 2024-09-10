import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AuctionApi } from '../../api';
import { Card, Row, Col, Typography, List, Image, Descriptions, Table } from 'antd';

const { Title, Text } = Typography;

const AuctionDetail: React.FC = () => {
  const { auctionId } = useParams<{ auctionId: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const auctionApi = new AuctionApi();

  const { data: auctionData, isLoading: isLoadingAuction } = useQuery({
    queryKey: ['auction', auctionId],
    queryFn: () => auctionApi.apiAuctionsIdGet(auctionId!),
  });

  const { data: bidsData, isLoading: isLoadingBids } = useQuery({
    queryKey: ['bids', auctionId],
    queryFn: () => auctionApi.apiAuctionsIdBidsGet(auctionId!),
  });

  const { data: itemData, isLoading: isLoadingItem } = useQuery({
    queryKey: ['auctionItem', auctionId],
    queryFn: () => auctionApi.apiAuctionsIdAuctionItemGet(auctionId!),
  });
  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  if (isLoadingAuction || isLoadingBids || isLoadingItem) {
    return <div>Loading...</div>;
  }

  const auction = auctionData?.data;
  const bids = bidsData?.data.items || [];
  const item = itemData?.data;

  const bidColumns = [
    {
      title: 'Bidder',
      dataIndex: 'bidderName',
      key: 'bidderName',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `$${amount.toFixed(2)}`,
    },
    {
      title: 'Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (date: string) => new Date(date).toLocaleString(),
    },
  ];

  return (
    <Card>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Title level={2}>Auction Details</Title>
          <Descriptions bordered>
            <Descriptions.Item label="Title" span={3}>{auction?.title}</Descriptions.Item>
            <Descriptions.Item label="Start Date">{new Date(auction?.startDate!).toLocaleString()}</Descriptions.Item>
            <Descriptions.Item label="End Date">{new Date(auction?.endDate!).toLocaleString()}</Descriptions.Item>
            <Descriptions.Item label="Status">{auction?.status}</Descriptions.Item>
            <Descriptions.Item label="Deposit Fee">${auction?.depositFee?.toFixed(2)}</Descriptions.Item>
            <Descriptions.Item label="Step Increment">${auction?.stepIncrement?.toFixed(2)}</Descriptions.Item>
            <Descriptions.Item label="Auction Code">{auction?.auctionCode}</Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={12}>
          <Title level={2}>Item Details</Title>
          <Image
            width={200}
            src={item?.images?.[0]}
            fallback='https://via.placeholder.com/200'
          />
          <Descriptions bordered>
            <Descriptions.Item label="Name" span={3}>{item?.name}</Descriptions.Item>
            <Descriptions.Item label="Brand">{item?.brand}</Descriptions.Item>
            <Descriptions.Item label="Color">{item?.color}</Descriptions.Item>
            <Descriptions.Item label="Size">{item?.size}</Descriptions.Item>
            <Descriptions.Item label="Gender">{item?.gender}</Descriptions.Item>
            <Descriptions.Item label="Condition">{item?.condition}</Descriptions.Item>
            <Descriptions.Item label="Initial Price">${item?.initialPrice?.toFixed(2)}</Descriptions.Item>
            <Descriptions.Item label="Description" span={3}>{item?.description}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      <Row style={{ marginTop: '20px' }}>
        <Col span={24}>
          <Title level={2}>Bid History</Title>
          <Table
            dataSource={bids}
            columns={bidColumns}
            rowKey="bidId"
            loading={isLoadingBids}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: bidsData?.data.totalCount,
              showSizeChanger: true,
              showQuickJumper: true,
              onChange: handleTableChange,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default AuctionDetail;