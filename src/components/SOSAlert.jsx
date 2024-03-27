import React from 'react';
import './SOSAlert.css'; // Import CSS file

import axios from 'axios';

const SOSAlert = ({ showAlert, user_id, setFlag }) => {
  const handleclick = async () => {
    console.log(user_id, "clicked")
    const res = await axios.post(`https://adssbckend.onrender.com/admin/updateF?user_id=${user_id}`);
    setFlag(false);
  }

  const handleresult = (result) => {
    if (result) {
      console.log('SOS Alert! Emergency situation detected!');
      alert('SOS Alert! Emergency situation detected!');
    }
  }
  return (
    <div onClick={handleclick}>
      {showAlert &&
        <div className={`sos-alert ${showAlert ? 'show' : ''}`}>
          <h2>SOS Alert!</h2>
          <p>Emergency situation detected!</p>
        </div>
      }
    </div>
  );
};

export default SOSAlert;
