import React, { useState, ChangeEvent, useEffect } from "react";

interface FilterProps {
  categories: string[];
  onFilterChange: (selectedCategories: string[]) => void;
}

const Filter: React.FC<FilterProps> = ({ categories, onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedCategories((prevState) =>
      prevState.includes(value)
        ? prevState.filter((category) => category !== value)
        : [...prevState, value]
    );
  };

  useEffect(() => {
    onFilterChange(selectedCategories);
  }, [selectedCategories, onFilterChange]);

  return (
    <div>
      <div className="filter-header">Find by filter</div>
      {categories.map((category: string, i: number) => (
        <div key={i}>
          <input
            type="checkbox"
            id={`category-${i}`}
            value={category}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={`category-${i}`}>{category}</label>
        </div>
      ))}
    </div>
  );
};

export default Filter;
