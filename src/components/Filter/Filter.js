import React, { useState, useContext } from "react";
import Slider from "@material-ui/core/Slider";
import { DataContext } from "../../contexts/DataContext";
import { FilteredContext } from "../../App";

const Filter = () => {
  const [value, setValue] = useState([0, 300]);
  const productsData = useContext(DataContext);
  const [filteredData, setFilteredData] = useContext(FilteredContext);

  const rangeSelector = (event, newValue) => {
    setValue(newValue);
    const filteredProducts = productsData.filter(
      (item) => item.price > value[0] && item.price < value[1]
    );
    setFilteredData(filteredProducts);
  };

  return (
    <div className="filter">
      <h3>Select Price Range:</h3>
      <Slider
        getAriaLabel={() => "Temperature range"}
        min={0}
        max={300}
        value={value}
        onChange={rangeSelector}
        valueLabelDisplay="auto"
      />
      ${value[0]} to ${value[1]}
    </div>
  );
};

export default Filter;
