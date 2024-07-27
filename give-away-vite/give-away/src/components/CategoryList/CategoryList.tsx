import React from "react";

interface CategoryListProps {
  categoryId: string;
  name: string;
  parentId: string;
  level: number;
  parent: string;
  status: string;
}

const CategoryList: React.FC<CategoryListProps> = () => {
  return <div className="category-list"></div>;
};

export default CategoryList;
