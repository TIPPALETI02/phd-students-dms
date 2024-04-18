import React from 'react';
import './first.css';
import { Link } from 'react-router-dom';
function First() {


    return (
        <div className="buttons">
            <Link to="/accounts/second" className="button">View Account details</Link>
            <Link to="/accounts/third" className="button">Fee Calculation</Link>
        </div>
    );
}

export default First;