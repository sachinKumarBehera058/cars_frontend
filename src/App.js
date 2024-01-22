import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarList from './carlist';
import Filters from './Filters';

const App = () => {
  const [filters, setFilters] = useState({
    price: ["All"],
    color: ["All"],
    mileage: ["All"],
  });
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [uniqueModelsCount, setUniqueModelsCount] = useState(0);

  const fetchAllCars = async () => {
    try {
      const response = await axios.get('https://cars-backend-iota.vercel.app/api/all');
      setCars(response.data.cars);
      setFilteredProducts(response.data.cars);
    } catch (error) {
      console.error('Error fetching all cars:', error.message);
    }
  };

  useEffect(() => {
    fetchAllCars(); // Fetch all cars when the component mounts

    // Fetch the number of unique car models after setting cars
    const fetchUniqueModelsCount = async () => {
      try {
        const uniqueModelsResponse = await axios.get('https://cars-backend-iota.vercel.app/api/count');
        setUniqueModelsCount(uniqueModelsResponse.data.myData);
      } catch (error) {
        console.error('Error fetching unique models count:', error.message);
      }
    };

    fetchUniqueModelsCount();
  }, []);

  const handleFilterClick = async () => {
    try {
      const response = await axios.get('https://cars-backend-iota.vercel.app/api/filter', {
        params: {
          model: searchQuery,
          colors: filters.color && filters.color[0],
          mileage: filters.mileage && filters.mileage[0],
          price: filters.price && filters.price[0],
        },
      });

      setFilteredProducts(response.data);
      setIsFilterApplied(true);
    } catch (error) {
      console.error('Error fetching filtered data:', error.message);
    }

  }

  // ... (rest of your component remains unchanged)
  const handleFilterChange = (type, value) => {
    setFilters({ ...filters, [type]: [value] });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleResetFilter = () => {
    setFilters({
      price: ["All"],
      colors: ["All"],
      mileage: ["All"],
    });
    setSearchQuery("");
    setFilteredProducts(cars);
    setIsFilterApplied(false);
  };

  const filterOptions = {
    prices: ["All", "20000", "30000", "40000", "50000", "60000", "80000", "100000", "200000", "300000"],
    colors: ["All", "Red", "Blue", "Silver", "Black", "White", "Gray", "Yellow"],
    mileages: ["All", "10", "15", "20", "25", "30", "35"],
  };



  return (
    <div className="bg-white-800 text-blue-900 p-2">
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <h1 className="text-4xl font-bold p-2 bg-blue-800 text-white text-center">
            My Car App
          </h1>

          <p className='text-center font-bold text-black p-6'>Total number of Car Models Present:  {uniqueModelsCount}</p>

          <Filters
            filterOptions={filterOptions}
            onFilterChange={handleFilterChange}
          />

          <input
            type="text"
            placeholder="Search by model"
            value={searchQuery}
            onChange={handleSearchChange}
            className="border p-2 m-2"
          />

          <button
            onClick={handleFilterClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Search
          </button>

          {isFilterApplied && (
            <button
              onClick={handleResetFilter}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
            >
              Reset Filter
            </button>
          )}

          {filteredProducts.length === 0 && isFilterApplied && (
            <p className="text-red-500  text-2xl text-center font-bold mt-4">No cars found.</p>
          )}

          {filteredProducts.length > 0 && (
            <CarList cars={filteredProducts} />
          )}
        </div>
        <footer className="bg-blue-800 text-white p-8">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
