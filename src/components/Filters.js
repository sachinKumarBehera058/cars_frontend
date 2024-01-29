// Filters.js
import React from 'react';
import CustomSlider from './CustomSlider'; // Import CustomSlider component

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import './filters.css';

const formatPriceWithCommas = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const Filters = ({
  filterOptions,
  onFilterChange,
  onColorChange,
  filters,
  onResetFilters,
}) => {
  if (!filterOptions || !filterOptions.colors) {
    return null;
  }

  const isAllChecked = filters.color.includes('All');

  return (
    <div className="sidebar">
      <h3 className="filter-label">Filter by:</h3>
      <div className="filter-options">
        <div>
          <h2 className="sub-filter">Price ($):</h2>
          <CustomSlider
            value={filters.price}
            onChange={(value) => onFilterChange('price', value)}
            label="Price"
            min={0}
            max={300000}
            valueLabelFormat={(value) => formatPriceWithCommas(value)}
          />
        </div>
        <div>
          <h2 className="sub-filter">Colors:</h2>
          <FormControlLabel
            control={
              <Checkbox
                checked={isAllChecked}
                onChange={(e) => onColorChange('All', e.target.checked)}
              />
            }
            label="All"
          />
          {filterOptions.colors.map((color, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={!isAllChecked && filters.color.includes(color)}
                  onChange={(e) => onColorChange(color, e.target.checked)}
                />
              }
              label={color}
            />
          ))}
        </div>
        <div>
          <h2 className="sub-filter">Mileage (MPG):</h2>
          <CustomSlider
            value={filters.mileage}
            onChange={(value) => onFilterChange('mileage', value)}
            label="Mileage"
            min={0}
            max={35}
            valueLabelFormat={(value) => `${value} MPG`}
          />
        </div>
      </div>
      <div className="filter-buttons">
        <button className="reset-btn" onClick={onResetFilters}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Filters;
