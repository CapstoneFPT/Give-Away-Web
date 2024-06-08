import React, { useState } from "react";

const Filter = ({ categories, onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    setSelectedCategories((prevState) =>
      prevState.includes(value)
        ? prevState.filter((category) => category !== value)
        : [...prevState, value]
    );
  };

  React.useEffect(() => {
    onFilterChange(selectedCategories);
  }, [selectedCategories, onFilterChange]);

  return (
    <div>
      <div className="filter-header">Find by filter</div>
      {categories.map((category, i) => (
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
