import React from 'react';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import './filters.css';

const Filters = ({
  filterOptions,
  onFilterChange,
  onColorChange,
  filters,
  onFilterClick,
  onResetFilters,
}) => {
  if (!filterOptions || !filterOptions.colors) {
    return null;
  }

  return (
    <div className="sidebar">
      <h3 className="filter-label">Filter by:</h3>
      <div className="filter-options">
        <div>
          <h2 className="sub-filter">Price ($):</h2>
          <div className="range-slider">
            <div className="slider-label">Min: {filters.price[0]}</div>
            <Slider
              value={filters.price}
              onChange={(_, value) => onFilterChange('price', value)}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `$${value}`}
              min={0}
              max={300000}
            />
            <div className="slider-label">Max: {filters.price[1]}</div>
          </div>
        </div>
        <div>
          <h2 className="sub-filter">Colors:</h2>
          {filterOptions.colors.map((color, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={filters.color.includes(color)}
                  onChange={(e) => onColorChange(color, e.target.checked)}
                />
              }
              label={color}
            />
          ))}
        </div>
        <div>
          <h2 className="sub-filter">Mileage (MPG):</h2>
          <div className="range-slider">
            <div className="slider-label">Min: {filters.mileage[0]}</div>
            <Slider
              value={filters.mileage}
              onChange={(_, value) => onFilterChange('mileage', value)}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value} MPG`}
              min={0}
              max={35}
            />
            <div className="slider-label">Max: {filters.mileage[1]}</div>
          </div>
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