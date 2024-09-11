import React, {useEffect, useState} from "react";
import {Button, Card, Col, Image, message, Modal, notification, Row, Typography,} from "antd";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {useCart} from "../../pages/CartContext";

import {useParams} from "react-router-dom";
import {FashionItemApi, FashionItemDetailResponse} from "../../api";

const {Paragraph} = Typography;

const styles = {
    para: {
        margin: "10px",
        fontSize: "18px",
        color: "black",
    },
    price: {
        color: "#d1d124",
        fontSize: "23px",
    },
};

interface Product {
    itemId: string;
    brand: string;
    categoryName: string;
    color: string;
    gender: string;
    name: string;
    note: string;
    sellingPrice: number;
    shopAddress: string;
    size: string;
    images: string[];
}

const ItemDetail: React.FC = () => {
    const {itemId} = useParams<{ itemId: string }>();
    const [product, setProduct] = useState<FashionItemDetailResponse | null>(
        null
    );
    const {dispatch, isItemInCart} = useCart();
    const [selectedImage, setSelectedImage] = useState<string>("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const userId = JSON.parse(localStorage.getItem("userId") || "null");
    console.log(product);
    useEffect(() => {
        if (itemId !== undefined) {
            async function fetchFashionItemDetails() {
                try {
                    const fashionItemApi = new FashionItemApi();
                    const response = await fashionItemApi.apiFashionitemsItemIdGet(
                        itemId!,
                        userId
                    );
                    console.debug(itemId, response.data);
                    setProduct(response.data.data!);
                    setSelectedImage(response.data.data?.images![0] || "");
                } catch (error) {
                    console.error(
                        "There was an error fetching the product details!",
                        error
                    );
                    message.error("Failed to fetch product details.");
                }
            }

            fetchFashionItemDetails();
        }
    }, []);

    const handleAddToCart = (product: FashionItemDetailResponse) => {
        if (product.isOrderedYet) {
            notification.error({
                message: "Already Ordered",
                description: `The item "${product.name}" has already been ordered.`,
            });
        } else if (isItemInCart(product.itemId!)) {
            notification.warning({
                message: "Already in Cart",
                description: `The item "${product.name}" is already in your cart.`,
            });
        } else {
            dispatch({type: "ADD_TO_CART", payload: {...product}});
            notification.success({
                message: "Added to Cart",
                description: `The item "${product.name}" has been added to your cart.`,
            });
            console.log("Adding item to cart with itemId:", product.itemId);
        }
    };
    const formatBalance = (sellingPrice: any) => {
        return new Intl.NumberFormat("de-DE").format(sellingPrice);
    };

    if (!product) {
        return <p>...Loading</p>;
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    return (
        <>
            <Card>
                <Card>
                    <h1 style={{textAlign: "center", fontSize: "40px"}}>
                        Product Detail
                    </h1>
                    <Row gutter={[16, 16]} style={{margin: "10px"}}>
                        <Col span={4}>
                            <Row
                                gutter={[10, 8]}
                                style={{maxHeight: "690px", overflowY: "auto"}}
                            >
                                {product.images?.map((image, index) => (
                                    <Col span={24} key={index}>
                                        <img
                                            src={image}
                                            alt={`Thumbnail ${index}`}
                                            style={{
                                                width: "95%",
                                                height: "230px",
                                                cursor: "pointer",
                                                border:
                                                    selectedImage === image ? "2px solid #1890ff" : "none",
                                            }}
                                            onClick={() => setSelectedImage(image)}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                        <Col span={11}>
                            <Image
                                src={selectedImage}
                                alt={product.name ? product.name : "N/A"}
                                style={{width: "100%", height: "750px"}}
                            />
                        </Col>
                        <Col span={9}>
                            <Card>
                                <Paragraph style={styles.para}>
                                    <strong style={{fontSize: "30px"}}>{product.name}</strong>
                                </Paragraph>
                                <Button
                                    type="link"
                                    onClick={() => setIsModalVisible(true)}
                                    style={{marginLeft: '255px', color: 'black', textDecoration: 'underline'}}
                                >
                                    <strong>Condition Guide</strong>
                                </Button>
                                <Row gutter={[16, 16]}>
                                    <Col span={12}>
                                        <Paragraph style={styles.para}>
                                            <strong>Brand:</strong> {product.brand}
                                        </Paragraph>
                                        <Paragraph style={styles.para}>
                                            <strong>Category:</strong> {product.categoryName}
                                        </Paragraph>
                                        <Paragraph style={styles.para}>
                                            <strong>Condition: {product.condition} </strong>
                                        </Paragraph>

                                    </Col>

                                    <Col span={12}>
                                        <Paragraph style={styles.para}>
                                            <strong>Gender:</strong> {product.gender}
                                        </Paragraph>
                                        <Paragraph style={styles.para}>
                                            <strong>Size:</strong> {product.size}
                                        </Paragraph>
                                        <Paragraph style={styles.para}>
                                            <strong>Color:</strong>
                                            {product.color}
                                        </Paragraph>
                                    </Col>
                                    <Paragraph style={styles.para}>
                                        <strong>Shop Address:</strong> {product.shopAddress}
                                    </Paragraph>
                                    <Paragraph style={styles.para}>
                                        <strong>Note:</strong> {product.note}
                                    </Paragraph>
                                </Row>
                                <Paragraph style={styles.para}>
                                    <strong style={styles.price}>
                                        Price: {formatBalance(product.sellingPrice)} VND
                                    </strong>
                                </Paragraph>
                                <Button
                                    style={{
                                        textAlign: "center",
                                        marginTop: "10px",
                                        backgroundColor: "#000000",
                                        color: "white",
                                        width: "170px",
                                        height: "50px",
                                        // border: "2px solid black",
                                        padding: "10px 20px",
                                        // borderRadius: "30px",
                                        fontSize: "18px",
                                    }}
                                    onClick={() => handleAddToCart(product)}
                                >
                                    Add to cart
                                    <ShoppingCartOutlined
                                        style={{fontSize: "25px", color: "white"}}
                                    />
                                </Button>
                            </Card>
                            <Card style={{marginTop: "20px"}}>
                                <Paragraph style={styles.para}>
                                    <strong>Description:</strong> {product.description}
                                </Paragraph>
                            </Card>
                        </Col>
                    </Row>
                </Card>
            </Card>
            <Modal
                title=""
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={800}

            >

                <h2 style={{textAlign: 'center'}}>Condition Guide</h2>
                <p><strong>Never worn, with tag</strong> - A never-worn item with tag is an item which has never been
                    worn and still has the original purchase hangtags on it (include a photo of the tag).</p> <br/>
                <p><strong>Never worn</strong> - A never-worn item without a tag is an item which has never been worn
                    and shows no defects or alterations.</p> <br/>
                <p><strong>Very good</strong> - An item in very good condition is a second-hand item which has been only
                    lightly used and extremely well maintained, which can show slight defects from usage. These must be
                    mentioned in the description and visible on the photos.</p> <br/>
                <p><strong>Good</strong> - An item in good condition is a second-hand item which has been worn and well
                    maintained. If the item has defects, they must be mentioned in the description and visible in the
                    photos.</p> <br/>
                <p><strong>Fair</strong> - An item in fair condition is a second-hand item which has been worn
                    frequently and shows defects (these are mentioned in the description and visible in photos).</p>


            </Modal>
        </>
    );
};

export default ItemDetail;
