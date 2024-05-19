// AcademicRecordButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function AcademicRecordButton() {
  const navigate = useNavigate();
  
  const handleShowAcademicRecord = () => {
    navigate('/academic-record');
  };

  return (
    <button onClick={handleShowAcademicRecord}>Student Academic Record</button>
  );
}

export default AcademicRecordButton;
