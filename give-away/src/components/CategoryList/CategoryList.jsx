import React from "react";
import { Link } from "react-router-dom";
import "./CategoryList.css";
const CategoryList = ({ categories }) => {
  return (
    <div className="category-list">
      <div className="category-header">All category</div>
      {categories.map((category, i) => (
        <Link key={i} to={`/${category}`} className="category-list-item">
          {category}
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
