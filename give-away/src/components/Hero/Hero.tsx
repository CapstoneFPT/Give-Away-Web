import React from "react";
import "./Hero.css";
import { Carousel } from "antd";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import hero_imae from "../Assets/hero_image.png";
const Hero: React.FC = () => {
  return (
    <div className="hero">
      {/* <div className="hero-left">
        <h2>New arrivals only</h2>
        <div>
          <div className="hand-hand-icon">
            <p>New</p>
            <img src={hand_icon} alt="hand icon" />
          </div>
          <p>Collections</p>
          <p>for everyone</p>
        </div>
        <div className="hero-latest-btn">
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="arrow icon" />
        </div>
      </div> */}
      <div className="hero-right">
        <div>
          <h1
            style={{
              textAlign: "center",
              fontSize: "50px",
              fontWeight: "bolder",
            }}
          >
            Welcome to Give Away
          </h1>
        </div>
        <Carousel style={{ marginTop: "2%" }} autoplay={true}>
          <div >
            <img
              style={{ width: "100%", height: "30%" }}
              src="https://emoi.vn/wp-content/uploads/2020/11/do-secondhand-7.png"
              alt="Hero 1"
              
            />
          </div>
          <div>
            <img
              style={{ width: "100%", height: "30%" }}
              src="https://cdn-images.vtv.vn/2022/1/13/photo-1-16420742504011699677621-crop-16420746973442116528313.jpg"
              alt="Hero 2"
            />
          </div>
          <div>
            <img
              style={{ width: "100%", height: "30%" }}
              src="https://www.elleman.vn/app/uploads/2022/03/03/212156/Phoi-do-voi-phong-cach-retro-mua-He-elle-man-cover.jpg"
              alt="Hero 3"
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Hero;
