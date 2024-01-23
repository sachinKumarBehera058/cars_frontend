import React from 'react';

import './carlist.css'; 

const CarList = ({ cars}) => {
  console.log('Cars in CarList:', cars);

  if (!cars || !Array.isArray(cars)) {
    return <p>No cars available</p>;
  }
  return (
    <div className="car-list">
      {cars.map((car, index) => (
        // Render each car item
        <div key={car._id} className="car-card">
          <img
            src={`https://imgd-ct.aeplcdn.com/664x415/n/cw/ec/134287/city-exterior-left-front-three-quarter.jpeg?isig=0&q=80/300x200?text=${car.model}`} 
            alt={car.model}
            className="car-image"
            />
          <div className="car-details">
            <p className="car-model"> {car.model} {car.year} </p>
            <p className="car-price">${car.listPrice.toLocaleString()}</p>
            <div>
            <p className="car-info">{car.colors}</p>
            <p className="car-info">{car.mileage} MPG</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarList;