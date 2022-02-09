import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../contexts/DataContext";
import { useNavigate } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import "./Search.css";

const Search = () => {
  const productsData = useContext(DataContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [nameSearch, setNameSearch] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  useEffect(() => {
    productsData.forEach((item) => {
      if (search.toLowerCase() === item.category.toLowerCase()) {
        setCategorySearch(item.category);
        setNameSearch("");
        console.log("category");
        console.log(categorySearch);
      } else if (search.toLowerCase() === item.productName.toLowerCase()) {
        setNameSearch(item.productName);
        setCategorySearch("");
        console.log("name");
      } else if (search === "") {
        return null;
      }
    });
  }, [search]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (categorySearch) {
        navigate(`/category/${categorySearch.split(" ").join("-")}`);
        setSearch("");
      } else if (nameSearch) {
        navigate(`/product/${nameSearch}`);
        setSearch("");
      }
    }
  };

  return (
    <div className="nav-icon">
      <div className="search-wrapper">
        <GoSearch className="search-icon" />
        <input
          className="search"
          placeholder="Search for..."
          type="search"
          value={search}
          onChange={handleChange}
          onKeyUp={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default Search;
