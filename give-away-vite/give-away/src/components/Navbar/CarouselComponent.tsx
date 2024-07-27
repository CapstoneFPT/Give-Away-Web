// src/components/CarouselComponent.js
import React from 'react';
import Slider from 'react-slick';
import { Card,  } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const items = [
  { id: 1, type: 'Giày Nam', imageUrl: 'path-to-mens-shoes-image.jpg' },
  { id: 2, type: 'Giày Nữ', imageUrl: 'path-to-womens-shoes-image.jpg' },
  { id: 3, type: 'Quần Áo Nam', imageUrl: 'path-to-mens-clothes-image.jpg' },
  { id: 4, type: 'Quần Áo Nữ', imageUrl: 'path-to-womens-clothes-image.jpg' },
  { id: 5, type: 'Phụ Kiện Nam', imageUrl: 'path-to-mens-accessories-image.jpg' },
  { id: 6, type: 'Phụ Kiện Nữ', imageUrl: 'path-to-womens-accessories-image.jpg' },
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
    cssEase: 'linear'
  };


  return (
   <div style={{ padding: '20px' }}>
      <h2>Secondhand Clothes</h2>
      <Slider {...settings}>
        {items.map(item => (
          <div key={item.id}>
            <Card
              cover={<img src={item.imageUrl} alt={item.type} style={{ width: '100%', height: 'auto' }} />}
              actions={[<SettingOutlined key="setting" />]}
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
