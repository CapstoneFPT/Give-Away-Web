import React from "react";
import "./RelatedProducts.css";
import data_product from "../Assets/data";
import Item from "../Item/Item";

const RelatedProducts = ({ category }) => {
  console.log(category);
  console.log(data_product);

  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {data_product

          .filter((item) => item.category === category)
          .map((item, i) => {
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                category={item.category}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          })}
      </div>
    </div>
  );
};

export default RelatedProducts;
