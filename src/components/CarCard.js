import React from 'react';
import "../components/CarCard.css";

const CarCard = ({ car }) => {
  return (
    <div key={car._id} className="car-card">
      <img
        src={car.image} 
        alt={car.model}
        className="car-image"
      />
      <div className="car-details">
        <p className="car-model">{car.model} {car.year}</p>
        <p className="car-price">${car.listPrice.toLocaleString()}</p>
        <div>
          <p className="car-info">{car.colors}</p>
          <p className="car-info">{car.mileage} MPG</p>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
