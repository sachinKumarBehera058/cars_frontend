import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const CustomLoader = () => {
  return (
    <Loader
      type="TailSpin" // Choose the loader type (check the library documentation for options)
      color="#00BFFF" // Set the loader color
      height={100} // Set the loader height
      width={100} // Set the loader width
    />
  );
};

export default CustomLoader;
