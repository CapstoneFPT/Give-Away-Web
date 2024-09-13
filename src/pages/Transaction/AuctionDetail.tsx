import React, { useState } from "react";
import { useParams } from "react-router-dom"; // Bỏ import useHistory
import { useQuery } from "@tanstack/react-query";
import { AuctionApi } from "../../api";
import {
  Card,
  Row,
  Col,
  Typography,
  Image,
  Descriptions,
  Table,
  Tag,
  Spin,
  Button, // Thêm import Spin từ antd
} from "antd";
import { getAuctionStatus } from "../../utils/types";

const { Title } = Typography;

const AuctionDetail: React.FC = () => {
  const { auctionId } = useParams<{ auctionId: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const userId = JSON.parse(localStorage.getItem("userId") || "{}");
  const [pageSize, setPageSize] = useState(10);
  const auctionApi = new AuctionApi();

  const { data: auctionData, isLoading: isLoadingAuction } = useQuery({
    queryKey: ["auction", auctionId, userId],
    queryFn: () => auctionApi.apiAuctionsIdGet(auctionId!, userId),
  });

  const { data: bidsData, isLoading: isLoadingBids } = useQuery({
    queryKey: ["bids", auctionId],
    queryFn: () => auctionApi.apiAuctionsIdBidsGet(auctionId!),
  });

  const { data: itemData, isLoading: isLoadingItem } = useQuery({
    queryKey: ["auctionItem", auctionId],
    queryFn: () => auctionApi.apiAuctionsIdAuctionItemGet(auctionId!),
  });

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  if (isLoadingAuction || isLoadingBids || isLoadingItem) {
    return <Spin size="large" />; // Sử dụng Spin để hiển thị loading
  }

  const auction = auctionData?.data;
  const bids = bidsData?.data.items || [];
  const item = itemData?.data;

  const bidColumns = [
    {
      title: "Bidder",
      dataIndex: "bidderName",
      key: "bidderName",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `${formatBalance(amount)} VND`,
    },
    {
      title: "Date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (date: string) => new Date(date).toLocaleString(),
    },
  ];

  const formatBalance = (price: number): string => {
    return new Intl.NumberFormat("de-DE").format(price);
  };

  return (
    <Card>
      <Button style={{ backgroundColor: 'black', color: 'white' }} onClick={() => window.history.back()}>Back</Button> {/* Nút quay lại sử dụng window.history */}
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card>
            <Title level={2}>Auction Details</Title>
            <Descriptions column={1}>
              <Descriptions.Item label={<strong>Title</strong>} span={3}>
                {auction?.title}
              </Descriptions.Item>
              <Descriptions.Item label={<strong>Start Date</strong>}>
                {new Date(auction?.startDate!).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label={<strong>End Date</strong>}>
                {new Date(auction?.endDate!).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label={<strong>Status</strong>}>
                <Tag
                  style={{ marginRight: "10px" }}
                  color={getAuctionStatus(auction?.status!)}
                >
                  {auction?.status!}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label={<strong>Deposit Fee</strong>}>
                {formatBalance(auction?.depositFee!)} VND
              </Descriptions.Item>
              <Descriptions.Item label={<strong>Step Increment</strong>}>
                {formatBalance(auction?.stepIncrement!)} VND
              </Descriptions.Item>
              <Descriptions.Item label={<strong>Auction Code</strong>}>
                {auction?.auctionCode}
              </Descriptions.Item>
              <Descriptions.Item label={<strong>You won?</strong>}>
                {auction?.won ? (
                  <Tag color="green">Won</Tag>
                ) : (
                  <span role="img" aria-label="crying">😢</span>
                )}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Title level={2}>Product Details</Title>
            <Image.PreviewGroup>
              <Row gutter={[16, 16]}>
                {item?.images?.map((image: string, index: number) => (
                  <Col key={index}>
                    <Image
                      width={100}
                      src={image}
                      fallback="https://via.placeholder.com/200"
                    />
                  </Col>
                ))}
              </Row>
            </Image.PreviewGroup>
            <Descriptions column={3}>
              <Descriptions.Item label={<strong>Product Code</strong>} span={3}>
                {item?.itemCode}
              </Descriptions.Item>
              <Descriptions.Item label={<strong>Initial Price</strong>}>
                {formatBalance(item?.initialPrice || 0)} VND
              </Descriptions.Item>
              <Descriptions.Item label={<strong>Product Name</strong>}>
                {item?.name}
              </Descriptions.Item>
              <Descriptions.Item label={<strong>Condition</strong>}>
                {item?.condition}
              </Descriptions.Item>
              <Descriptions.Item label={<strong>Brand</strong>}>
                {item?.brand}
              </Descriptions.Item>
              <Descriptions.Item label={<strong>Color</strong>}>
                {item?.color}
              </Descriptions.Item>
              <Descriptions.Item label={<strong>Size</strong>}>
                {item?.size}
              </Descriptions.Item>
              <Descriptions.Item label={<strong>Gender</strong>}>
                {item?.gender}
              </Descriptions.Item>
              <Descriptions.Item label={<strong>Description</strong>} span={3}>
                {item?.description}
              </Descriptions.Item>
              <Descriptions.Item label={<strong>Note</strong>} span={3}>
                {item?.note}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
      <Row style={{ marginTop: "20px" }}>
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
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default AuctionDetail;