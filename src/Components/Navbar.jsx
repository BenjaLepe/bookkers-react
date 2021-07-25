import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/navbar.css';
import useAuth from '../hooks/useAuth';

export default function Navbar() {
  const { currentUser, handleUserLogout } = useAuth();
  const [isSession, setIsSession] = useState(false);

  useEffect(() => {
    setIsSession(currentUser ? true : false);
  }, [currentUser]);

  return (
    <div className="nav-bg">
      {currentUser || isSession ? (
        <div className="nav-bar container">
          <div className="nav-group-logo">
            <NavLink to="/" className="nav-link nav-title">Bookkers</NavLink>
          </div>
          <div className="nav-group">
            <NavLink to="/session-profile" className="nav-link">Profile</NavLink>
            <NavLink to="/books/new" className="nav-link">Add book</NavLink>
            <button
              type="button"
              className="nav-button"
              onClick={handleUserLogout}
            >
              Log out
            </button>

          </div>
        </div>
      ) : (
        <div className="nav-bar container">
          <div className="nav-group-logo">
            <NavLink to="/" className="nav-link nav-title">Bookkers</NavLink>
          </div>
          <div className="nav-group">
            <NavLink to="/login" className="nav-link">Log In</NavLink>
            <NavLink to="/sign-up" className="nav-link">Sign Up </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}