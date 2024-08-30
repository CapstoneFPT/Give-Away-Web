import React, {useEffect, useState} from "react";
import {FashionItemApi, FashionItemList, MasterItemApi, MasterItemDetailResponse, SizeType} from "../../api";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, Col, Image, Input, Modal, Row, Select, Spin, Typography} from "antd";

const formatBalance = (balance: any) => {
    return new Intl.NumberFormat('de-DE').format(balance);
};
const ChildItemShop = () => {
    const [dataSource, setDataSource] = useState<FashionItemList[]>([]);
    const [dataMaster, setDataMaster] = useState<MasterItemDetailResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [filterSize, setFilterSize] = useState<SizeType | undefined>(undefined);
    const [filterColor, setFilterColor] = useState<string | undefined>(undefined);
    const [filterCondition, setFilterCondition] = useState<string | undefined>(undefined);
    const [itemCodeFilter, setItemCodeFilter] = useState<string | undefined>(undefined);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const {shopId, masterItemId} = useParams<{ shopId: string, masterItemId: string }>();
    const userId = JSON.parse(localStorage.getItem("userId") || "null");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const fashionItemApi = new FashionItemApi();
                const masterItemApi = new MasterItemApi();
                const masterResponse = await masterItemApi.apiMasterItemsFindGet(null!, null!, masterItemId);
                setDataMaster(masterResponse.data);

                const itemResponse = await fashionItemApi.apiFashionitemsGet(
                    itemCodeFilter, // itemCode filter
                    userId, // memberId (not used here)
                    null!, // gender (not used here)
                    filterColor, // color filter
                    filterSize, // size filter
                    filterCondition, // condition filter
                    null!, // minPrice (not used here)
                    null!, // maxPrice (not used here)
                    ["Available"], // status (not used here)
                    ["ItemBase", "ConsignedForSale"], // type (not used here)
                    null!, // sortBy (not used here)
                    null!, // sortDescending (not used here)
                    null!, // pageNumber (not used here)
                    null!, // pageSize (not used here)
                    null!, // name (not used here)
                    null!, // categoryId (not used here)
                    shopId,
                    masterItemId!,
                    null!,
                );

                setDataSource(itemResponse.data.items!);
            } catch (error) {
                console.error("Error fetching item variants:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [shopId, masterItemId, itemCodeFilter, filterSize, filterColor, filterCondition]);

    const showConditionGuide = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const sizeOptions = Object.values(SizeType).map(size => (
        <Select.Option key={size} value={size}>
            {size}
        </Select.Option>
    ));

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>List Products</h1>
            <div style={{marginBottom: '16px', marginTop: '40px'}}>
                <Input
                    placeholder="Search by Product Code"
                    onChange={e => setItemCodeFilter(e.target.value)}
                    style={{width: '200px', marginRight: '8px', marginLeft: '15px'}}
                />
                <Select
                    placeholder="Size"
                    onChange={value => setFilterSize(value)}
                    style={{width: '70px', marginRight: '8px'}}
                >
                    {sizeOptions}
                </Select>
                <Select
                    placeholder="Color"
                    onChange={value => setFilterColor(value)}
                    style={{width: '90px', marginRight: '8px'}}
                >
                    <Select.Option value="Red">Red</Select.Option>
                    <Select.Option value="Blue">Blue</Select.Option>
                    <Select.Option value="Green">Green</Select.Option>
                </Select>
                <Select
                    placeholder="Condition"
                    onChange={value => setFilterCondition(value)}
                    style={{width: '180px', marginRight: '8px'}}
                >
                    <Select.Option value="Never worn, with tag">Never worn, with tag</Select.Option>
                    <Select.Option value="Never worn">Never worn</Select.Option>
                    <Select.Option value="Very good">Very good</Select.Option>
                    <Select.Option value="Good">Good</Select.Option>
                    <Select.Option value="Fair">Fair</Select.Option>
                </Select>
                <Button
                    type="link"
                    onClick={showConditionGuide}
                    style={{marginLeft: '255px', color: 'black', textDecoration: 'underline'}}
                >
                    <strong>Condition Guide</strong>
                </Button>
            </div>
            {isLoading ? (
                <Spin style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}} size="large"/>
            ) : (
                <Card>
                    <Row gutter={[16, 16]}>
                        <Col span={6}>
                            {dataMaster && (
                                <Card
                                    title="Master Product Details"
                                    headStyle={{
                                        backgroundColor: 'black',
                                        color: 'white'
                                    }} // Set background to black and text to white
                                >
                                    <Typography.Title level={5}><strong>Item Code:</strong> {dataMaster.masterItemCode}
                                    </Typography.Title>
                                    <Typography><strong>Name:</strong> {dataMaster.name}</Typography><br/>
                                    <Typography><strong>Brand:</strong> {dataMaster.brand}</Typography><br/>
                                    <Typography><strong>Category:</strong> {dataMaster.categoryName}</Typography><br/>
                                    <Typography><strong>Gender:</strong> {dataMaster.gender}</Typography><br/>
                                    <Typography><strong>Description:</strong> {dataMaster.description}</Typography><br/>
                                </Card>
                            )}
                        </Col>
                        {dataSource.map(record => (
                            <Col span={6}
                                 key={record.itemId}> {/* Each card takes 6 columns for 4 cards per row */}
                                <Card
                                    style={{marginBottom: '16px', cursor: 'pointer', overflow: 'hidden'}}
                                    onClick={() => navigate(`/itemDetail/${record.itemId}`)}
                                    cover={
                                        <Image
                                            alt={record.name ?? "N/A"}
                                            src={record.image!}
                                            style={{height: "300px", objectFit: "cover"}}
                                        />
                                    }
                                >

                                    <div style={{padding: '10px'}}>
                                        <Typography.Title level={5}>Product Code: {record.itemCode}</Typography.Title>
                                        <Typography>Brand: {record.brand}  </Typography>
                                        <Typography>Size: {record.size}</Typography>
                                        <Typography>Color: {record.color}</Typography>
                                        <div><strong>Price: {formatBalance(record.sellingPrice)} VND</strong></div>
                                        <Typography>Condition: {record.condition}</Typography>
                                    </div>
                                </Card>
                            </Col>
                        ))}

                    </Row>
                </Card>
            )}
            <Modal
                title="Condition Guide"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <p><strong>Never worn, with tag</strong> - A never-worn item with tag is an item which has never been
                    worn and still has the original purchase hangtags on it (include a photo of the tag).</p>
                <p><strong>Never worn</strong> - A never-worn item without a tag is an item which has never been worn
                    and shows no defects or alterations.</p>
                <p><strong>Very good</strong> - An item in very good condition is a second-hand item which has been only
                    lightly used and extremely well maintained, which can show slight defects from usage. These must be
                    mentioned in the description and visible on the photos.</p>
                <p><strong>Good</strong> - An item in good condition is a second-hand item which has been worn and well
                    maintained. If the item has defects, they must be mentioned in the description and visible in the
                    photos.</p>
                <p><strong>Fair</strong> - An item in fair condition is a second-hand item which has been worn
                    frequently and shows defects (these are mentioned in the description and visible in photos).</p>
            </Modal>
        </div>
    );
}

export default ChildItemShop;