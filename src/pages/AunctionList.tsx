import React, { useEffect, useState } from "react";
import { Button, Card, Space, Table } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import { AuctionApi, AuctionListResponse } from "../api";
import backgroundImageUrl from "../components/Assets/adobestock_573340270.jpg";

const { Column } = Table;

const AuctionList = () => {
  const [data, setData] = useState<AuctionListResponse[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userId") || "null");
    setUserId(userId);
    console.log(userId);
  }, []);

  useEffect(() => {
    const auctionApi = new AuctionApi();

    const fetchData = async () => {
      try {
        const response = await auctionApi.apiAuctionsGet(null!,false,[
          "Approved",
          "OnGoing"
        ]);
        const fetchedData: AuctionListResponse[] = response.data.items? response.data.items.map((item: any) => ({
              ...item,
              startDate: moment(item.startDate).format("YYYY-MM-DD HH:mm"),
              endDate: moment(item.endDate).format("YYYY-MM-DD HH:mm"),
            }))
          : ([] as AuctionListResponse[]);
        console.log(fetchedData);
        setData(
          fetchedData.sort((a: any, b: any) =>
            moment(a.auctionTime).diff(moment(b.auctionTime))
          )
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleAuctionButtonClick = async (
    auctionId: string,
    auctionItemId: string
  ) => {
    try {
      const depositApi = new AuctionApi();
      const depositStatus =
        await depositApi.apiAuctionsAuctionIdDepositsHasDepositGet(
          auctionId,
          userId!
        ); // Giả sử hàm này kiểm tra trạng thái đặt cọc của người dùng
      console.log(depositStatus.data.hasDeposit);

      if (depositStatus.data.hasDeposit) {
        // Điều hướng đến trang đấu giá
        window.location.href = `/auction/${auctionId}?item=${auctionItemId}`;
      } else {
        // Điều hướng đến trang đặt cọc
        window.location.href = `/deposit`;
      }
    } catch (error) {
      console.error("Error checking deposit status:", error);
    }
  };

  return (
    <>
      <div
        style={{
          width: "90%",
          marginLeft: "80px",
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          backgroundColor: "rgba(255, 255, 255, 0)",
        }}
      >
        <h1 style={{ textAlign: "center", margin: "30px" }}>Auction List</h1>
        {data && (
          <Table
            style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
            pagination={false}
            dataSource={data}
            rowKey="auctionId"
          >
            <Column
              title="Product"
              dataIndex="imageUrl"
              key="imageUrl"
              render={(_, record: { imageUrl: string }) => (
                <Space size="middle">
                  <img
                    src={record.imageUrl}
                    alt="Product"
                    style={{ width: "150px", height: "150px" }}
                  />
                </Space>
              )}
            />

            {/* <Column title="Auction ID" dataIndex="auctionId" key="auctionId" /> */}
            <Column title="Title" dataIndex="title" key="title" />
            <Column title="Start Date" dataIndex="startDate" key="startDate" />
            <Column title="End Date" dataIndex="endDate" key="endDate" />
            <Column
              title="Deposit Fee"
              dataIndex="depositFee"
              key="depositFee"
            />
            {/* <Column title="Shop ID" dataIndex="shopId" key="shopId" /> */}
            {/* <Column
              title="Auction Item ID"
              dataIndex="auctionItemId"
              key="auctionItemId"
            /> */}
            <Column title="Status" dataIndex="status" key="status" />
            {/* <Column
              title="Step Increment"
              dataIndex="stepIncrement"
              key="stepIncrement"
            /> */}
            <Column
              title="Action"
              key="action"
              render={(
                _,
                record: { auctionItemId: string; auctionId: string }
              ) => (
                <Space size="middle">
                  <Link to={`/detailProductAuction/${record.auctionItemId}`}>
                    <Button>Detail</Button>
                  </Link>
                  <Button
                    onClick={() =>
                      handleAuctionButtonClick(
                        record.auctionId,
                        record.auctionItemId
                      )
                    }
                  >
                    Auction
                  </Button>
                </Space>
              )}
            />
          </Table>
        )}
      </div>
    </>
  );
};

export default AuctionList;
