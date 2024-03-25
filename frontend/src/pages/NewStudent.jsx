import React from 'react';
import '../assets/css/addstudentstyle.css';
function NewStudent() {
      return (
  <div>
        <h1>JNTU College Of Engineering (Autonomus) Anantapuramu-515002</h1>
        <div className="container">
          <h2>PhD Student Data Management System</h2>
          <button style={{ width: '50%' }} onClick={handleAddButtonClick}>Add New Student Data</button>
          <button style={{ width: '50%' }} onClick={handleViewButtonClick}>View Student Data</button>
        </div>
      </div>
      );
    };
export default NewStudent;