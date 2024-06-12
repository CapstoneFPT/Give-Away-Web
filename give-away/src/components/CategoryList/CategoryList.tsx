import React from "react";
import { Link } from "react-router-dom";
import "./CategoryList.css";

interface CategoryListProps {
  categories: string[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <div className="category-list">
      <div className="category-header">All category</div>
      {categories.map((category: string, i: number) => (
        <Link key={i} to={`/${category}`} className="category-list-item">
          {category}
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
