import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Typography, Image } from "antd";
import Footer from "../components/Footer/Footer";
import { useParams } from "react-router-dom";
import { FashionItemApi, FashionItemDetailResponse } from "../api";

const { Title, Paragraph } = Typography;

interface Product {
  id: number;
  name: string;
  note: string;
  images: string[];
  brand: string;
  categoryName: string;
  size: string;
  gender: string;
  shopAddress: string;
  color: string;
}

const DetailProductAunction: React.FC = () => {
  const { auctionItemID } = useParams<{ auctionItemID: string }>();
  console.log(auctionItemID);
  const [product, setProduct] = useState<FashionItemDetailResponse | null>(
    null
  );
  const [selectedImage, setSelectedImage] = useState<string | undefined>("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fashionItemAuction = new FashionItemApi();
        const response = await fashionItemAuction.apiFashionitemsItemIdGet(
          auctionItemID!
        );
        setProduct(response.data.data!);
        setSelectedImage(response.data.data?.images![0]);
        console.log(response);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProduct();
  }, [auctionItemID]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Card>
        <Card>
          <h1 style={{ textAlign: "center", fontSize: "40px" }}>
            Detail Product Auction
          </h1>
          <Row gutter={[16, 16]} style={{ margin: "10px" }}>
            <Col span={4}>
              <Row gutter={[10, 8]}>
                {product.images?.map((image, index) => (
                  <Col span={24} key={index}>
                    <img
                      src={image}
                      alt={`Thumnail : ${index}`}
                      style={{
                        width: "90%",
                        height: "230px",
                        cursor: "pointer",
                        border:
                          selectedImage === image
                            ? "2px solid #1890ff"
                            : "none",
                      }}
                      onClick={() => setSelectedImage(image)}
                    />
                  </Col>
                ))}
              </Row>
            </Col>
            <Col span={12}>
              <Image
                src={selectedImage}
                alt={product.name!}
                style={{ width: "90%", height: "750px" }}
              />
            </Col>
            <Col span={8}>
              <Card
                title="Product Details"
                headStyle={{ backgroundColor: "black", color: "white" }}
              >
                <Title level={4}>Product Code: {product.itemCode}</Title>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Paragraph>
                      <strong>Product Name:</strong> {product.name}
                    </Paragraph>
                    <Paragraph>
                      <strong>Brand:</strong> {product.brand}
                    </Paragraph>
                    <Paragraph>
                      <strong>Category:</strong> {product.categoryName}
                    </Paragraph>
                  </Col>

                  <Col span={12}>
                    <Paragraph>
                      <strong>Gender:</strong> {product.gender}
                    </Paragraph>
                    <Paragraph>
                      <strong>Size:</strong> {product.size}
                    </Paragraph>
                    <Paragraph>
                      <strong>Color:</strong> {product.color}
                    </Paragraph>
                  </Col>
                  <Paragraph>
                    <strong>Condition:</strong> {product.condition}
                  </Paragraph>

                  <Paragraph>
                    <strong>Shop Address:</strong> {product.shopAddress}
                  </Paragraph>
                </Row>
                <Paragraph>
                  <strong>Description:</strong> {product.description}
                </Paragraph>
                <Paragraph>
                  <strong>Note:</strong> {product.note}
                </Paragraph>
              </Card>
              <Card
  style={{ marginTop: '20px' }}
  headStyle={{ backgroundColor: "black", color: "white" }}
  title="Policy Auction"
>
  <h2 style={{ textAlign: "center" }}>Eligibility to Bid</h2>
  <p>
    Only registered participants are eligible to bid.<br />
    All bidders must be at least 18 years old and provide valid identification.
  </p>
  <br />

  <h2 style={{ textAlign: "center" }}>Bidding Process</h2>
  <p>
    All bids must be placed online/in-person, depending on the auction format.<br />
    Bids must be made in the stated increments. Bids that do not meet this increment will not be considered.<br />
    Each bidder is responsible for ensuring their bid is placed correctly. Mistakes made during the bidding process are the sole responsibility of the bidder.
  </p>
  <br />

  <h2 style={{ textAlign: "center" }}>Winning Bids</h2>
  <p>
    The highest bid at the close of the auction wins the item.<br />
    In the case of a tie bid, the first bid placed at the highest price will be declared the winner.<br />
    Winning bidders will be notified within 24 hours of the auction close.
  </p>
  <br />

  <h2 style={{ textAlign: "center" }}>Payment Terms</h2>
  <p>
    Full payment is due within 3 business days of winning the auction.<br />
    Acceptable payment methods include credit card, bank transfer, or other methods stated by the auction organizer.<br />
    Failure to make payment within the specified period will result in forfeiture of the winning bid, and the item will be offered to the next highest bidder.
  </p>
  <br />

  <h2 style={{ textAlign: "center" }}>Item Descriptions and Condition</h2>
  <p>
    All items are sold "as-is" with no warranties or guarantees. Descriptions and images provided are for informational purposes only and do not constitute a guarantee of condition.<br />
    It is the bidder's responsibility to inspect the item before placing a bid, when possible.
  </p>
  <br />

  <h2 style={{ textAlign: "center" }}>Shipping and Delivery</h2>
  <p>
    The buyer is responsible for all shipping and delivery costs, unless otherwise specified.<br />
    Items will be shipped within 7-10 business days after payment is received and confirmed.
  </p>
  <br />

  <h2 style={{ textAlign: "center" }}>Refunds and Returns</h2>
  <p>
    All sales are final. No returns or refunds will be accepted unless otherwise stated by the auction organizer.<br />
    If an item is found to be significantly misrepresented, the buyer must contact the auction house within 48 hours of receiving the item to request a resolution.
  </p>
  <br />

  <h2 style={{ textAlign: "center" }}>Auctioneer's Discretion</h2>
  <p>
    The auctioneer reserves the right to reject any bid, withdraw any item from the auction, or cancel the auction at any time without notice.<br />
    In case of any disputes, the auctioneer's decision will be final.
  </p>
  <br />

  <h2 style={{ textAlign: "center" }}>Liability</h2>
  <p>
    The auction house is not responsible for any errors in bidding or any technical issues experienced by the bidder during the auction process.<br />
    By participating in the auction, the bidder agrees to indemnify and hold harmless the auction organizer from any claims arising from their participation.
  </p>
  <br />

  
</Card>

            </Col>
          </Row>
        </Card>
      </Card>
      <Footer />
    </>
  );
};

export default DetailProductAunction;
