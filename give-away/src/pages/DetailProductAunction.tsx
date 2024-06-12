  import React from 'react'
  import { Card, Button } from 'antd';
  import './CSS/DetailProductAunction.css'
  const styles = {
    buttonDetail: {
      marginRight: '30px',
      backgroundColor: '#000000',
      color: 'white',
      width: '150px',
      height: '50px',
      border: "2px solid black",
      padding: "10px 20px",
       borderRadius: '30px'

    }
  }
  const DetailProductAunction = () => {
    return (

      <>
        <div style={{ marginTop: '25px', margin: '50px' }}>
          <h1>Detail Product</h1>
        </div>
        <div className="detaildisplay">

          <div className="detaildisplay-left" >
            <div className="detaildisplay-img-list">
              {/* <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" /> */}

              <img src='https://pos.nvncdn.com/778773-105877/ps/20221013_n6HKsuzizp6K2vDgrJLI4qA8.jpg' alt='#' />
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9ph72uwNLRO6XZ4QJ_060CrIn2_IXLmfRNg&s" alt="#" />
              <img src="https://product.hstatic.net/1000026602/product/img_5435_6afcdabbf16448eca040cc4bdcf0ba23.jpg" alt="#" />



            </div>
            <div className="detaildisplay-img">
              <Card>
                <img className="detaildisplay-main-img" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo0eiEg1QmLNnNqEi90l5GwmHByWe7c1Vcng&s' alt="" />
              </Card>
            </div>
          </div>
          <div className="detaildisplay-right">
            <h1>Áo Supper đẹp </h1>
            <div className="detaildisplay-right-star">
              {/* <img src={star_icon} alt="" />
              <img src={star_icon} alt="" />
              <img src={star_icon} alt="" />
              <img src={star_icon} alt="" />
              <img src={star_dull_icon} alt="" /> */}

              <p>(122)</p>
            </div>
            <div className="detaildisplay-right-price">
              <div className="detaildisplay-right-price-old">
                VND
              </div>
              <div className="detaildisplay-right-price-new">
                VND
              </div>
            </div>
            <div className="detaildisplay-right-description">
              A light weight and comfortable
            </div>
            <div className="detaildisplay-right-size">
              <h1>Select size</h1>
              <div className="detaildisplay-right-sizes">
                <div>S</div>

              </div>
            </div>

            <p className="detaildisplay-right-category">
              <span>Category:</span> Women, T-Shirt, Crop Top
            </p>
            <p className="detaildisplay-right-category">
              <span>Category:</span> Modern, Latest
            </p>
          </div>
        </div>
        <div style={{ margin: '50px' }}>
          <h2>Descption</h2>
          <Card>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Card>
          <div style={{ margin: '30px' }}>

            <Button style={styles.buttonDetail}>Deposit</Button>
            <Button style={styles.buttonDetail}>Aunction</Button>
          </div>
        </div>


      </>
    )
  }

  export default DetailProductAunction