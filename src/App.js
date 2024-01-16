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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://cars-backend-iota.vercel.app/api/cars');
        console.log("data fetched");
        setCars(response.data.myData);
        setFilteredProducts(response.data.myData);

        // Fetch the number of unique car models after setting cars
        const uniqueModelsResponse = await axios.get('https://cars-backend-iota.vercel.app/api/cars/models/count');
        setUniqueModelsCount(uniqueModelsResponse.data.uniqueModelsCount);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);


  const filterProducts = () => {
    let updatedFilteredProducts = cars;

    if (filters.color[0] !== "All") {
      updatedFilteredProducts = updatedFilteredProducts.filter(
        (car) => car.colors.includes(filters.color[0])
      );
    }

    if (filters.mileage[0] !== "All") {
      updatedFilteredProducts = updatedFilteredProducts.filter(
        (car) => car.mileage.toString() === filters.mileage[0]
      );
    }

    if (filters.price[0] !== "All") {
      const selectedPrice = parseInt(filters.price[0].replace("$", "").replace(",", ""));
      updatedFilteredProducts = updatedFilteredProducts.filter(
        (car) => car.listPrice === selectedPrice
      );
    }

    if (searchQuery.trim() !== "") {
      const lowerCaseQuery = searchQuery.toLowerCase();
      updatedFilteredProducts = updatedFilteredProducts.filter(
        (car) =>
          car.model.toLowerCase().includes(lowerCaseQuery) ||
          car.year.toString().includes(lowerCaseQuery) ||
          (Array.isArray(car.colors) && car.colors.some((color) => color.toLowerCase().includes(lowerCaseQuery)))
      );
    }

    setFilteredProducts(updatedFilteredProducts);
    setIsFilterApplied(true);
  };

  const handleFilterClick = () => {
    filterProducts();
  };

  const handleFilterChange = (type, value) => {
    setFilters({ ...filters, [type]: [value] });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleResetFilter = () => {
    setFilters({
      price: ["All"],
      color: ["All"],
      mileage: ["All"],
    });
    setSearchQuery("");
    setFilteredProducts(cars);
    setIsFilterApplied(false);
  };

  const filterOptions = {
    prices: ["All", "$20,000", "$25,000", "$30,000", "$35,000", "$40,000", "$45,000", "$50,000", "$60,000", "$80,000", "$100,000", "$200,000", "$300,000"],
    colors: ["All", "Red", "Blue", "Silver", "Black", "White", "Gray", "Yellow"],
    mileages: ["All", "10", "15", "16.5", "17.5", "18", "18.5", "19", "19.5", "20", "20.5", "21", "21.5", "22", "22.5", "23.5", "24", "24.5", "25", "25.5", "26", "28.5", "30"],
  };

  return (
    <div className="bg-white-800 text-blue-900 p-4">
      <h1 className="text-4xl font-bold p-2 bg-blue-800 text-white text-center">
        My Car App
      </h1>


      <p className='text-center font-bold text-black p-6'>Total number of Car Models Present :  {uniqueModelsCount}</p>

      <Filters
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
      />

      <input
        type="text"
        placeholder="Search by model, year, or color"
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

      <CarList cars={filteredProducts} />
    </div>
  );
};

export default App;
