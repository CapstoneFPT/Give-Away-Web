import React, { useContext } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../context/ShopContext";
import Item from "../components/Item/Item";
import CategoryList from "../components/CategoryList/CategoryList";
import Filter from "../components/Filter/Filter";
import { useState } from "react";
const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const categories = ["tanktop", "shirt"];
  const [filteredProducts, setFilteredProducts] = useState(all_product);

  const onFilterChange = (selectedCategories) => {
    if (selectedCategories.length === 0) {
      setFilteredProducts(all_product);
    } else {
      setFilteredProducts(
        all_product.filter((product) =>
          selectedCategories.includes(product.category)
        )
      );
    }
  };
  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-content">
        <div>
          <CategoryList categories={categories} />
          <Filter categories={categories} onFilterChange={onFilterChange} />
        </div>
        <div className="shopcategory-products">
          {filteredProducts.map((item, i) => {
            if (props.category === item.category) {
              return (
                <Item
                  className="item"
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
      <div className="shopcategory-loadmore">Explore more</div>
    </div>
  );
};

export default ShopCategory;
