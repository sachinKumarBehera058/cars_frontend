import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import CarList from './components/carlist';
import Filters from './components/Filters';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import img from './components/not-found.jpg';


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
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const [firstload, setFirstload] = useState(true);

  const fetchFilteredCars = useCallback(async () => {
    try {
      setLoading(true); // Set loading state to true when starting to fetch data

      const response = await axios.get('https://cars-backend-iota.vercel.app/api/filter', {
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
    } finally {
      setLoading(false); // Set loading state to false once the data is fetched (whether successful or not)
    }
  }, [filters.color, filters.mileage, filters.price, searchQuery]);

  useEffect(() => {
    // Fetch initial data
    if(firstload)
    {
      setFirstload(false);
    }
    const timerId = setTimeout(() => {  //debounce except on first load
      fetchFilteredCars();
    }, 500);

    return () => clearTimeout(timerId); // Cleanup on unmount or when searchbox changes

  }, [fetchFilteredCars, filters, searchQuery,firstload]);

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

    // Reset and fetch data
    fetchFilteredCars();
    setIsFilterApplied(false);
    setSearchQuery("");
  };

  const filterOptions = {
    colors: ["Red", "Blue", "Silver", "Black", "White", "Gray", "Yellow"],
  };
  if(loading){
    
    return <Loader/>
  }

  return (
    <>
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="main-container">
      
        <div className="sidbar">
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
             <div className="no-cars">
             <p className="message">Oops !! No cars available.</p>
             <img src={img} alt="No Cars Found" className="not-found-image" />
           </div>
          )}
          {filteredProducts.length > 0 && <CarList cars={filteredProducts} />}
        </div>
      </div>
    </>
  );
};

export default App;
