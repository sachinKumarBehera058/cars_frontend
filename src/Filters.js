import React from 'react';
import "./filters.css"

const Filters = ({ filterOptions, onFilterChange, onColorChange, filters, onFilterClick, onResetFilters }) => {
  if (!filterOptions || !filterOptions.colors) {
    return null;
  }

  return (
    <div className="sidebar">
      <h3 className="filter-label">Filter by:</h3>
      <div className="filter-options">
        <div>
          <h2 className='sub-filter'>Price ($) :</h2>
          <input
            type="range"
            min={0}
            max={300000}
            value={filters.price[1]}
            onChange={(e) => onFilterChange('price', [0, parseInt(e.target.value)])}
          />
          <span>{filters.price[1]}</span>
        </div>
        <div>
          <h2 className='sub-filter'>Colors:</h2>
          {filterOptions.colors.map((color, index) => (
            <div key={index} className="color-checkbox">
              <input
                type="checkbox"
                id={color}
                value={color}
                checked={filters.color.includes(color)}
                onChange={(e) => onColorChange(color, e.target.checked)}
              />
              <span>{color}</span>
            </div>
          ))}
        </div>
        <div>
          <h2 className='sub-filter'>Mileage (MPG):</h2>
          <input
            type="range"
            min={0}
            max={35}
            value={filters.mileage[1]}
            onChange={(e) => onFilterChange('mileage', [0, parseInt(e.target.value)])}
          />
          <span>{filters.mileage[1]}</span>
        </div>
      </div>
      <div className="filter-buttons">
        <button className="filter-btn" onClick={onFilterClick}>
          Filter
        </button>
        <button className="reset-btn" onClick={onResetFilters}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Filters;
