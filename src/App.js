import React, { useState, useEffect } from 'react';
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
  // const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const fetchAllCars = async () => {
    try {
      const response = await axios.get('https://cars-backend-iota.vercel.app/api/all');
      // setCars(response.data.cars);
      setFilteredProducts(response.data.cars);
    } catch (error) {
      console.error('Error fetching all cars:', error.message);
    }
  };

  useEffect(() => {
    fetchAllCars();
  }, []);

  const handleFilterClick = async () => {
    try {
      const response = await axios.get('https://cars-backend-iota.vercel.app/api/filter', {
        params: {
          model: searchQuery,
          colors: filters.color && filters.color[0],
          mileageMin: filters.mileage && filters.mileage[0],  // Send the minimum value for mileage
          mileageMax: filters.mileage && filters.mileage[1],  // Send the maximum value for mileage
          priceMin: filters.price && filters.price[0],        // Send the minimum value for price
          priceMax: filters.price && filters.price[1],        // Send the maximum value for price
        },
      });
  
      setFilteredProducts(response.data);
      setIsFilterApplied(true);
    } catch (error) {
      console.error('Error fetching filtered data:', error.message);
    }    
  };
  
  
  const handleColorChange = (color, checked) => {
    let updatedColors;

    if (checked) {
      updatedColors = [...filters.color, color];
    } else {
      updatedColors = filters.color.filter((c) => c !== color);
    }

    handleFilterChange('color', updatedColors);
  };

  const handleFilterChange = (type, value) => {
    setFilters({ ...filters, [type]: value });
  };

  // const handleSearchChange = (event) => {
  //   setSearchQuery(event.target.value);
  // };

  const handleResetFilters = () => {
    // Reset your filters here
    setFilters({
      price: [0, 300000],
      color: ["All"],
      mileage: [0, 35],
    });

    
    fetchAllCars();
    setIsFilterApplied(false);
    setSearchQuery("");
  };

  const filterOptions = {
    colors: ["All", "Red", "Blue", "Silver", "Black", "White", "Gray", "Yellow"],
  };

  return (
    <>
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        onFilterClick={handleFilterClick}
      />

      <div className="main-container">
        <div className="sidebar">
          <Filters
            filterOptions={filterOptions}
            onFilterChange={handleFilterChange}
            onColorChange={handleColorChange}
            filters={filters}
            onFilterClick={handleFilterClick}
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