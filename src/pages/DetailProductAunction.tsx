import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Typography, Image, Divider } from "antd";
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
            <Col span={10}>
              <Image
                src={selectedImage}
                alt={product.name!}
                style={{ width: "90%", height: "750px" }}
              />
              
            </Col>
            
            <Col span={10}>
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
              <Card style={{marginTop:"20px"}}
                title="Condition Guide"
                headStyle={{ backgroundColor: "black", color: "white" }}
              >
                <Row gutter={[16,16]}>
                  <Col span={12}>
                  <p>
                  <strong>Never worn, with tag</strong> - A never-worn item with
                  tag is an item which has never been worn and still has the
                  original purchase hangtags on it (include a photo of the tag).
                </p>{" "}
                <br />
                <p>
                  <strong>Never worn</strong> - A never-worn item without a tag
                  is an item which has never been worn and shows no defects or
                  alterations.
                </p>{" "}
                <br />
                
                
                  </Col>
                  <Col span={12}>
                  <p>
                  <strong>Good</strong> - An item in good condition is a
                  second-hand item which has been worn and well maintained. If
                  the item has defects, they must be mentioned in the
                  description and visible in the photos.
                </p>{" "}
                <br />
                <p>
                  <strong>Fair</strong> - An item in fair condition is a
                  second-hand item which has been worn frequently and shows
                  defects (these are mentioned in the description and visible in
                  photos).
                </p>
                  </Col>
                </Row>
                <p>
                  <strong>Very good</strong> - An item in very good condition is
                  a second-hand item which has been only lightly used and
                  extremely well maintained, which can show slight defects from
                  usage. These must be mentioned in the description and visible
                  on the photos.
                </p>{" "}
               
              </Card>
              
            </Col>
            <Card
            style={{ marginTop: "20px" }}
             headStyle={{ backgroundColor: "black", color: "white" }}
            title="Policy Auction"
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Typography>
                  <Title level={5}>Auction Participation Requirements</Title>
                  <Paragraph>
                    To participate in an auction, a deposit is required before
                    the auction starts. The deposit must be made within the
                    specified timeframe before the auction begins.
                  </Paragraph>
                  <Divider />

                  <Title level={5}>Deposit Forfeiture Policy</Title>
                  <Paragraph>
                    If you place a deposit but do not participate in the
                    auction, the deposit will be forfeited. For unsuccessful
                    bidders, the deposit will be refunded in the form of system
                    points.
                  </Paragraph>
                  <Divider />

                  <Title level={5}>Deposit and Bid Increments</Title>
                  <Paragraph>
                    The deposit fee is based on the value of the item. The bid
                    increments will be calculated as a percentage of the initial
                    value of the item and multiplied by the percentage you have
                    chosen.
                  </Paragraph>
                  <Divider />
                </Typography>
              </Col>
              <Col span={12}>
                <Title level={5}>Payment and Deposit Deduction</Title>
                <Paragraph>
                  If you win the auction, the deposit will be deducted from the
                  total amount you need to pay for the item. Please note that
                  the auction only accepts payment in system points.
                </Paragraph>
                <Divider />

                <Title level={5}>Shipping and Delivery</Title>
                <Paragraph>
                  Once the auctioned item is paid for, the shop will package and
                  deliver the item to the address provided in the order. The
                  customer can inspect the item upon receipt and has 7 days to
                  request a refund if there is any discrepancy.
                </Paragraph>
                <Divider />
              </Col>
            </Row>
            <Title level={4} style={{ textAlign: "center" }}>
              Thank you from Give Away!
            </Title>
          </Card>
          </Row>
          
        </Card>
      </Card>
      <Footer />
    </>
  );
};

export default DetailProductAunction;
