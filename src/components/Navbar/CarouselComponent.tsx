import React, { Suspense } from "react";
import Slider, {Settings} from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "antd";

interface ItemType {
  id: number;
  type: string;
  imageUrl: () => Promise<{ default: string }>;
}

const items: ItemType[] = [
  {
    id: 1,
    type: "Men Shoe",
    imageUrl: () => import("../Assets/AIR+VAPORMAX+2023+FK+SE.png"),
  },
  {
    id: 2,
    type: "Women Shoe",
    imageUrl: () => import("../Assets/womensShoes.jpg"),
  },
  {
    id: 3,
    type: "Men clothes",
    imageUrl: () => import("../Assets/mensClothes.jpg")
  },
  {
    id: 4,
    type: "Women clothes",
    imageUrl: () => import("../Assets/womenClothes.jpg")
  },
  {
    id: 5,
    type: "Men Eyeglasses",
    imageUrl: () => import("../Assets/meneyeglasses.jpg"),
  },
  {
    id: 6,
    type: "Women Brancelets",
    imageUrl: () => import("../Assets/J18N-ROSECROSS-SILVER-1.jpg"),
  },
];

const LazyImage = React.lazy(() => import('./LazyImage'));

const CarouselComponent: React.FC = () => {
  const settings : Settings = {
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
                      <Suspense fallback={<div>Loading...</div>}>
                        <LazyImage
                            imageUrl={item.imageUrl}
                            alt={item.type}
                            style={{ width: "100%", height: "auto", minHeight: "614px" }}
                        />
                      </Suspense>
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