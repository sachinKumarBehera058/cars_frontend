// Import React and other necessary modules
import React from 'react';

// Define the CarList component
const CarList = ({ cars }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cars.map((car, index) => (
        // Render each car item
        <div key={car._id} className={`bg-white p-4 rounded-lg shadow-md transform transition-transform hover:scale-105`}>
          {/* Display car details */}
          <img
            src={`https://imgd-ct.aeplcdn.com/664x415/n/cw/ec/134287/city-exterior-left-front-three-quarter.jpeg?isig=0&q=80/300x200?text=${car.model}`} 
            alt={car.model}
            className="w-full h-50 object-cover mb-4 rounded-md"
          />
          <div className="text-center">
            <p className="text-lg font-bold mb-2">{car.model}</p>
            <p className="text-gray-600">Year: {car.year}</p>
            <p className="text-gray-600">List Price: ${car.listPrice.toLocaleString()}</p>
            <p className="text-gray-600">Colors: {car.colors}</p>
            <p className="text-gray-600">Mileage: {car.mileage} MPG</p>
            <p className="text-gray-600">Power BHP: {car.powerBHP}</p>
            <p className="text-gray-600">Max Speed: {car.maxSpeed} MPH</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Export the component
export default CarList;
