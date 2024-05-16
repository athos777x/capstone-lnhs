// HeadBar.js
import React from 'react';
import '../CssFiles/headbar.css'; // Ensure this path is correct


function HeaderBar({ showSidebar, toggleSidebar }) {
  return (
    <div className="header">
      <button className="toggle-btn" onClick={toggleSidebar}>
        {showSidebar ? 'Hide Sidebar' : 'Show Sidebar'}
      </button>
      <h1>LNHS - MIS</h1>
    </div>
  );
}

export default HeaderBar;

