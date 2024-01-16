import React from "react";

const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <div
          key={index}
          className="bg-white rounded-md overflow-hidden shadow-md transition-transform transform hover:scale-105"
        >
          <img
            src={`https://imgd-ct.aeplcdn.com/664x415/n/cw/ec/134287/city-exterior-left-front-three-quarter.jpeg?isig=0&q=80/300x200?text=${product.model}`}
            alt={product.model}
            className="w-80 h-40 object-cover object-center"
          />
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{product.model}</h2>
            <p className="text-gray-600 mb-2">{product.year}</p>
            <p className="text-gray-800 mb-2">Price: ${product.price}</p>
            <p className="text-gray-800 mb-2">
              Mileage: {product.mileage} miles
            </p>
            <div className="flex">
              <p className="text-gray-800 mb-2 mr-2">Colors:</p>
              <ul className="flex">
                {product.colors.map((color, colorIndex) => (
                  <li key={colorIndex} className="mr-2">
                    {color}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
