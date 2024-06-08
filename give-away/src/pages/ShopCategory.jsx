import React, { useContext } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../context/ShopContext";
import Item from "../components/Item/Item";
import Filter from "../components/Filter/Filter";
import { useState } from "react";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const clothTypes = ["t-shirt", "jeans", "jacket"];
  const [filteredProducts, setFilteredProducts] = useState(all_product);
  const [filtersVisible, setFiltersVisible] = useState(true);

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };
  const onFilterChange = (selectedCategories) => {
    if (selectedCategories.length === 0) {
      setFilteredProducts(all_product);
    } else {
      setFilteredProducts(
        all_product.filter((product) =>
          selectedCategories.includes(product.clothType)
        )
      );
    }
  };
  return (
    <div className="shop-category">
      <div className="shop-category-header">
        <h1>
          {props.category.charAt(0).toUpperCase() + props.category.slice(1)}{" "}
          Collection
        </h1>
      </div>

      <div>
        <button
          aria-label="FILTERS"
          type="button"
          className="filter-results d-flex align-items-center ml-auto mr-2 mouseFocusUnActive"
          onClick={toggleFilters}
        >
          {filtersVisible ? (
            <span className="filter-sidebar--open">HIDE FILTERS</span>
          ) : (
            <span className="filter-sidebar--closed">FILTERS</span>
          )}
        </button>
      </div>
      <div className="shopcategory-content">
        <div
          className="filter-bar"
          style={{ display: filtersVisible ? "block" : "none" }}
        >
          <Filter categories={clothTypes} onFilterChange={onFilterChange} />
        </div>
        <div className="shopcategory-products">
          {filteredProducts.map((item, i) => {
            if (props.category === item.category) {
              return (
                <Item
                  className="item"
                  id={item.id}
                  name={item.name}
                  clothTypes={item.clothType}
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
