import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { useEffect, useState } from "react";


const HeaderLayout = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const localUserInfo = JSON.parse(localStorage.getItem('usetInfo'));
    if (localUserInfo) {
      setUserData(localUserInfo);
    } else {
      setUserData(null);
    }
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-custom px-3">
        <Link className="navbar-brand" to={userData && userData.role === 'admin' ? '/dashboard' : '/'}>Kashyap's Shop</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {userData &&
              <li className="nav-item"><span className="nav-link">Welcome, {userData.username} </span> </li>
            }
            <li className="nav-item">
              <Link className="nav-link" to="/product">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/cart">Cart</Link>
            </li>

            {userData ? (
              <li className="nav-item">
                <Link className="nav-link" to='/' onClick={async () => {
                  localStorage.removeItem('usetInfo');
                  const userData = localStorage.getItem('usetInfo');
                  setUserData(userData);
                  window.location.reload()
                }}>Logout</Link>
              </li>

            ) : (<li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>)}

          </ul>
        </div>
      </nav>

    </>
  );
};

export default HeaderLayout;
