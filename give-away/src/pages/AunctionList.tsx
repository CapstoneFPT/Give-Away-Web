import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import { AuctionApi, AuctionListResponse } from "../api";

const { Column } = Table;

const AunctionList = () => {
  const [data, setData] = useState<AuctionListResponse[]>([]);

  useEffect(() => {
    const auctionApi = new AuctionApi();
    const fetchData = async () => {
      try {
        const response = await auctionApi.apiAuctionsGet();
        const fetchedData: AuctionListResponse[] = response.items
          ? response.items.map((item: any) => ({
              ...item,
              // auctionTime: moment(item.auctionTime).format("YYYY-MM-DD HH:mm"),
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

  return (
    <>
      <div style={{ width: "90%", marginLeft: "80px" }}>
        <h1 style={{ textAlign: "center", margin: "30px" }}>Auction List</h1>
        {data && (
          <Table pagination={false} dataSource={data}>
            <Column title="Auction ID" dataIndex="auctionID" key="auctionID" />
            <Column title="Title" dataIndex="title" key="title" />
            <Column title="Start Date" dataIndex="startDate" key="startDate" />
            <Column title="End Date" dataIndex="endDate" key="endDate" />
            <Column
              title="Deposit Fee"
              dataIndex="depositFee"
              key="depositFee"
            />
            <Column title="Shop ID" dataIndex="shopId" key="shopId" />
            <Column
              title="Auction Item ID"
              dataIndex="auctionItemId"
              key="auctionItemId"
            />
            <Column title="Status" dataIndex="status" key="status" />
            <Column
              title="Step Increment"
              dataIndex="stepIncrement"
              key="stepIncrement"
            />
            <Column
              title="Action"
              key="action"
              dataIndex={["auctionItemId", "auctionId"]}
              render={(_, record: { auctionItemId: string; auctionId: string }) => (
                <Space size="middle">
                  <Link to={`/detailProductAunction/${record.auctionItemId}`}>
                    <Button>Detail</Button>
                  </Link>
                  <Link to={`/aunction/${record.auctionId}`}>
                    <Button>Auction</Button>
                  </Link>
                </Space>
              )}
            />
          </Table>
        )}
      </div>
    </>
  );
};

export default AunctionList;
