import React from 'react';
import "../components/Navbar.css"
import img from '../Images/remove.png';

const Navbar = ({ searchQuery, onSearchChange, onClearClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <h1 className="logo">BUYC Corp</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search your Favourite Cars"
            value={searchQuery}
            onChange={onSearchChange}
            className="search-input"
          />
          {searchQuery && (
            <button className="clear-button" type="button" onClick={onClearClick}>
              <img src={img} alt="clear button" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;