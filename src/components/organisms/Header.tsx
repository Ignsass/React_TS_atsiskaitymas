import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <header>
      <div>
        <Link to="/">Home</Link>
        {isLoggedIn ? (
          <>
            <Link to="/add">Add</Link>
            <Link to="/user">User</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;