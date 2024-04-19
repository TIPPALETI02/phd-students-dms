import React from 'react';
import './third.css'
import { dateFormat } from '../util';

function Third() {

    const [registrationNumber, setRegistrationNumber] = React.useState('');
    const [isAccountData, setIsAccountData] = React.useState(false);
    const [accountsData, setAccountsData] = React.useState(null);
    const [studentData, setStudentData] = React.useState(null);
    const [totalFeePaid, setTotalFeePaid] = React.useState(null);

    const getAccountData = (e) => {
        e.preventDefault();
        if (!registrationNumber) {
            setAccountsData(null);
            alert('Please enter registration number');
            return;
        }
        setIsAccountData(true);
        fetch(`http://localhost:5000/accounts/${registrationNumber}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setAccountsData(data.account_details);
                setTotalFeePaid(data.account_details.reduce((acc, curr) => acc + parseFloat(curr.AmountPaid), 0));
                getStudentData();
            })
            .catch(err => console.log(err));
    }

    const getStudentData = () => {
        console.log(registrationNumber)
        fetch(`http://localhost:5000/students/${registrationNumber}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setStudentData(data.student[0]);
            })
            .catch(err => console.log(err));
    }

    const indianCurrencyDisplay = (amount) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
    }

    return (
        <div className="container">
            <div className="form-container">
                <form onSubmit={getAccountData}>
                    <label htmlFor="registrationNumber">Registration Number:</label>
                    <br />
                    <input
                        type="text"
                        id="registrationNumber"
                        placeholder="Enter registration number"
                        value={registrationNumber}
                        onChange={(e) => setRegistrationNumber(e.target.value)}
                    />
                    <br />
                    <button type="submit">Submit</button>
                </form>

                <br />
                <br />
                <br />

                {
                    isAccountData && accountsData &&
                    (<center>
                        {/* Student Data */}
                        <h1>Student Data</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>Admn Number</th>
                                    <th>Name</th>
                                    <th>FT/PT</th>
                                    <th>Branch</th>
                                    <th>Adm Year</th>
                                    <th>Total Fee Paid</th>
                                </tr>
                            </thead>
                            {
                                studentData &&
                                <tbody>
                                    <tr>
                                        <td>{studentData?.admn_no}</td>
                                        <td>{studentData?.name}</td>
                                        <td>{studentData?.mode}</td>
                                        <td>{studentData?.branch}</td>
                                        <td>{studentData?.year}</td>
                                        <td>{indianCurrencyDisplay(totalFeePaid)}</td>
                                    </tr>
                                </tbody>
                            }
                        </table>

                        <br />
                        {/* Account Data */}
                        <h1>Student's Fee Details</h1>

                        {
                            accountsData ?
                                <table>
                                    <thead>
                                        <tr>
                                            <th>DD/Challan No.</th>
                                            <th>Fee Paid</th>
                                            <th>Date Paid</th>
                                            <th>Payment Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            accountsData && accountsData.map((account, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{account.DDNumber}</td>
                                                        <td>{account.AmountPaid}</td>
                                                        <td>{dateFormat(account.DatePaid)}</td>
                                                        <td>{account.PaymentType == 'N/A' ? 'Challan' : account.PaymentType || 'Challan'}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                : <p>No accounts found for the given registration number</p>
                        }
                    </center>)
                }
            </div>
        </div>
    );
}
export default Third;