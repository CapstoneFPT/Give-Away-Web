// src/components/CarouselComponent.js
import React from 'react';
import { Carousel } from 'antd';

const CarouselComponent = () => {
  return (
    <Carousel style={{ marginTop: "2%" }} autoplay={true}>
      <div>
        <img
          style={{ width: "500%", height: "800px", objectFit: 'cover' }}
          src="https://emoi.vn/wp-content/uploads/2020/11/do-secondhand-7.png"
          alt="Hero 1"
        />
      </div>
      <div>
        <img
          style={{ width: "100%", height: "750px", objectFit: 'cover' }}
          src="https://cdn-images.vtv.vn/2022/1/13/photo-1-16420742504011699677621-crop-16420746973442116528313.jpg"
          alt="Hero 2"
        />
      </div>
      <div>
        <img
          style={{ width: "100%", height: "750px", objectFit: 'cover' }}
          src="https://www.elleman.vn/app/uploads/2022/03/03/212156/Phoi-do-voi-phong-cach-retro-mua-He-elle-man-cover.jpg"
          alt="Hero 3"
        />
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
