import React from 'react';
import "../components/Navbar.css"

const Navbar = ({ searchQuery, onSearchChange, onFilterClick }) => {
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
          <button onClick={onFilterClick} className="search-btn">
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
