import React, { useEffect, useState } from "react";
import { Button, Card, Space, Table } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import { AuctionApi, AuctionListResponse } from "../api";
import backgroundImageUrl from '../components/Assets/adobestock_573340270.jpg';
const { Column } = Table;

const AunctionList = () => {
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
        const response = await auctionApi.apiAuctionsGet();
        const fetchedData: AuctionListResponse[] = response.data.items
          ? response.data.items.map((item: any) => ({
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

  return (
    <>
      <div style={{ width: "90%", marginLeft: "80px",backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh', backgroundColor: 'rgba(255, 255, 255, 0)'
        }}>
      
       
      
      <h1 style={{ textAlign: "center", margin: "30px",  }}>Auction List</h1>
        {data && (
          <Table style={{backgroundColor: 'rgba(255, 255, 255, 0)'}} pagination={false} dataSource={data}>
            <Column title="Auction ID" dataIndex="auctionId" key="auctionId" />
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
                  <Link to={`/aunction/${record.auctionId}?item=${record.auctionItemId}`}>
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
