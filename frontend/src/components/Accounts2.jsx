import React from 'react';
import './second.css';

function Second() {

    return (
        <div className="container">
            <div className="form-container">
                <form >
                    <label htmlFor="registrationNumber">Registration Number:</label>
                    <input
                        type="text"
                        id="registrationNumber"

                        placeholder="Enter registration number"
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Roll Number</th>
                            <th>DD No/Challan</th>
                            <th>Fee Paid</th>
                        </tr>
                    </thead>
                    <tbody>

                        <td>10</td>
                        <td>2000</td>
                        <td>5000</td>


                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default Second;
