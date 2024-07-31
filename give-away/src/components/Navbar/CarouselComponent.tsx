import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import mensShoes from "../Assets/AIR+VAPORMAX+2023+FK+SE.png";
import mensEyeglasses from "../Assets/meneyeglasses.jpg";
import womenClothes from "../Assets/womenClothes.jpg";
import mensClothes from "../Assets/mensClothes.jpg";
import womenShoes from "../Assets/womensShoes.jpg";
import womenBrancelets from "../Assets/J18N-ROSECROSS-SILVER-1.jpg";
const items = [
  {
    id: 1,
    type: "Men Shoe",
    imageUrl: mensShoes,
  },
  {
    id: 2,
    type: "Women Shoe",
    imageUrl: womenShoes,
  },
  { id: 3, type: "Men clothes", imageUrl: mensClothes },
  { id: 4, type: "Women clothes", imageUrl: womenClothes },
  {
    id: 5,
    type: "Men Eyeglasses",
    imageUrl: mensEyeglasses,
  },
  {
    id: 6,
    type: "Women Brancelets",
    imageUrl: womenBrancelets,
  },
];

const CarouselComponent = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10,
    cssEase: "linear",
  };

  return (
    <div style={{ padding: "30px", width: "96%", textAlign: "center" }}>
      <h1 style={{ marginBottom: "20px", fontWeight: "bold" }}>
        Secondhand Clothes
      </h1>
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.id}>
            <Card
              style={{ padding: "5px", width: "470px", height: "180px", backgroundColor:"transparent" }}
              cover={
                <img
                  src={item.imageUrl}
                  alt={item.type}
                  style={{ width: "100%", height: "auto", minHeight: "614px" }}
                />
              }
            >
              <Card.Meta title={item.type} />
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselComponent;
