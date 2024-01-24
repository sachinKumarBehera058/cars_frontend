// App.js file

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import CarList from './components/carlist';
import Filters from './components/Filters';
import Navbar from './components/Navbar';

import './App.css';
import "@fontsource/poppins";

const App = () => {
  const [filters, setFilters] = useState({
    price: [0, 300000],
    color: ["All"],
    mileage: [0, 35],
  });

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const fetchFilteredCars = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/filter', {
        params: {
          model: searchQuery,
          colors: filters.color.join(','),
          mileageMin: filters.mileage && filters.mileage[0],
          mileageMax: filters.mileage && filters.mileage[1],
          priceMin: filters.price && filters.price[0],
          priceMax: filters.price && filters.price[1],
        },
      });

      setFilteredProducts(response.data);
      setIsFilterApplied(true);
    } catch (error) {
      console.error('Error fetching filtered data:', error.message);
    }
  }, [filters.color, filters.mileage, filters.price, searchQuery]);

  useEffect(() => {
    fetchFilteredCars();
  }, [fetchFilteredCars, filters, searchQuery]);

  const handleColorChange = (color, checked) => {
    let updatedColors;

    if (filters.color.includes("All")) {
      updatedColors = [color];
    } else {
      if (checked) {
        updatedColors = [...filters.color, color];
      } else {
        updatedColors = filters.color.filter((c) => c !== color);
      }
    }

    handleFilterChange('color', updatedColors);
  };

  const handleFilterChange = (type, value) => {
    setFilters({ ...filters, [type]: value });
  };

  const handleResetFilters = () => {
    setFilters({
      price: [0, 300000],
      color: ["All"],
      mileage: [0, 35],
    });

    fetchFilteredCars();
    setIsFilterApplied(false);
    setSearchQuery("");
  };

  const filterOptions = {
    colors: ["Red", "Blue", "Silver", "Black", "White", "Gray", "Yellow"],
  };

  return (
    <>
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="main-container">
        <div className="sidebar">
          <Filters
            filterOptions={filterOptions}
            onFilterChange={handleFilterChange}
            onColorChange={handleColorChange}
            filters={filters}
            onResetFilters={handleResetFilters}
          />
        </div>

        <div className="main-content">
          {filteredProducts.length === 0 && isFilterApplied && (
            <p className="message">Oops !! No cars available.</p>
          )}
          {filteredProducts.length > 0 && <CarList cars={filteredProducts} />}
        </div>
      </div>
    </>
  );
};

export default App;
