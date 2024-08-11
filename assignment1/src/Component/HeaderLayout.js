import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Navbar = ({ formData }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom px-3">
      <Link className="navbar-brand" to="/">Kashyap's Shop</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/product">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cart">Cart</Link>
          </li>

          {formData.id === 1 ? (
            <li className="nav-item">
              <Link className="nav-link" to="/account">Welcome, {formData.firstName}</Link>
            </li>
          ) : <li className="nav-item">
            <Link className="nav-link" to="/account">Account</Link>
          </li>}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
