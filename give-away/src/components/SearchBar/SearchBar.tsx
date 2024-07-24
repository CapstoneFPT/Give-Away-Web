import React, { useState, ChangeEvent, FormEvent } from "react";
import "./SearchBar.css";
import { Navigate, useNavigate } from "react-router-dom";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
const navigate = useNavigate();
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchTerm);
    navigate(`/search?q=${searchTerm}`);
  };

  return (
    <div className="searchBar">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
