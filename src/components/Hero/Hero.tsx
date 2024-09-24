import React from "react";
import "./Hero.css";
import { Carousel } from "antd";
import hero3 from "../Assets/snapedit_1727189929462.jpeg"
import hero2 from "../Assets/snapedit_1727190425797.jpeg"

const Hero: React.FC = () => {
  return (
    <div className="hero">
      
      <div className="hero-right">
        <div>
          {/* <h1
            style={{
              textAlign: "center",
              fontSize: "50px",
              fontWeight: "bolder",
            }}
          >
            Welcome to Give Away
          </h1> */}
        </div>
        <Carousel style={{ marginTop: "2%" }} autoplay={true}>
          <div >
            <img
              style={{ width: "100%", height: "1100px" }}
              
              src="https://www.elleman.vn/app/uploads/2022/03/03/212156/Phoi-do-voi-phong-cach-retro-mua-He-elle-man-cover.jpg "
              alt="Hero 1"
              
            />
          </div>
          <div>
            <img
              style={{ width: "100%", height: "1100px" }}
              src={hero2}
              alt="Hero 2"
            />
          </div>
          <div>
            <img
              style={{ width: "100%", height: "1100px" }}
              src={hero3}
              alt="Hero 3"
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Hero;
