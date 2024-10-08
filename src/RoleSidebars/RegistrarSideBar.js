import React from 'react';
import '../CssFiles/sidebar.css';
import { FiHome, FiLogOut, FiUsers, FiMenu, FiChevronLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function RegistrarSideBar({ showSidebar, toggleSidebar, handleLogout }) {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className={`sidebar ${showSidebar ? 'show' : 'hide'}`} style={{ zIndex: 1100 }}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {showSidebar ? <FiChevronLeft /> : <FiMenu />}
      </button>
      <div className="buttons">
        <button onClick={() => handleNavigate('/home')}>
          <FiHome className="icon" /> Home
        </button>
        <button onClick={() => handleNavigate('/registrar-students')}>
          <FiUsers className="icon" /> Students
        </button>
        <button onClick={() => handleLogout()}>
          <FiLogOut className="icon" /> Logout
        </button>
      </div>
    </div>
  );
}

export default RegistrarSideBar;
