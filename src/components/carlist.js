import React from 'react';
import CarCard from './CarCard';
import './carlist.css'; 


const CarList = ({ cars }) => {
  console.log('Cars in CarList:', cars);

  if (!cars || !Array.isArray(cars)) {
    return <p>No cars available</p>;
  }
  
  return (
    <div className="car-list">
      {cars.map((car, index) => (
        <CarCard key={car._id} car={car} />
      ))}
    </div>
  );
};

export default CarList;
