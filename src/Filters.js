import React from "react";

const Filters = ({ filterOptions, onFilterChange }) => {
  return (
    <div className="mb-4 border">
      <label className="block text-sm font-bold mb-2">Filter by:</label>
      <div className="flex space-x-4">
        <div>
          <label>Price:</label>
          <select onChange={(e) => onFilterChange("price", e.target.value)}>
            {filterOptions.prices.map((price, index) => (
              <option key={index} value={price}>
                {price}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Colors:</label>
          <select onChange={(e) => onFilterChange("color", e.target.value)}>
            {filterOptions.colors.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Mileage:</label>
          <select onChange={(e) => onFilterChange("mileage", e.target.value)}>
            {filterOptions.mileages.map((mileage, index) => (
              <option key={index} value={mileage}>
                {mileage} MPG
              </option>
            ))}
          </select> 
        </div>
      </div>
    
    </div>
  );
};

export default Filters;