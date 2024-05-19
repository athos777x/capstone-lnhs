// ProfileButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileButton() {
  const navigate = useNavigate();
  
  const handleShowProfile = () => {
    navigate('/profile');
  };

  return (
    <button onClick={handleShowProfile}>My Profile</button>
  );
}

export default ProfileButton;
