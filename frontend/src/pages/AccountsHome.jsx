import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function AccountsHome() {

    const navigate = useNavigate();
    const [accounts, setAccounts] = React.useState(null);
    const [newAccount, setNewAccount] = React.useState({
        StudentID: '',
        DDNumber: '',
        AmountPaid: '',
        DatePaid: '',
        PaymentType: ''
    });

    useEffect(() => {
        document.title = 'Accounts | PhD Students DMS';
        fetch('http://localhost:5000/accounts', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setAccounts(data.accounts);
            })
            .catch(err => console.log(err));
    }, []);

    // {
    //     "accounts": [
    //         {
    //             "StudentID": "18PH0406",
    //             "DDNumber": "080619",
    //             "AmountPaid": "20850.00",
    //             "DatePaid": "2019-01-27T18:30:00.000Z",
    //             "PaymentType": "N/A"
    //         },
    //         {
    //             "StudentID": "18PH0406",
    //             "DDNumber": "676534",
    //             "AmountPaid": "20000.00",
    //             "DatePaid": "2019-07-28T18:30:00.000Z",
    //             "PaymentType": "N/A"
    //         }
    //     ]
    // }

    return (
        <div>
            <h1>Accounts</h1>

            <button type="button" className="view-students" style={{
                backgroundColor: '#3498db',
                color: '#fff',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'block',
                margin: '20px auto'
            }} onClick={() => window.location.href = '/students'}>View Students Data</button>

            {/* Add New Account Record */}
            <h1>Add New Record</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                fetch('http://localhost:5000/accounts/add', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify(newAccount)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        alert('New Account Added Successfully!');
                    })
                    .catch(err => console.log(err));
            }}>
                <label>Student ID</label>
                <input required type='text' value={newAccount.StudentID} onChange={(e) => setNewAccount({ ...newAccount, StudentID: e.target.value })} />
                <label>DD Number</label>
                <input required type='text' value={newAccount.DDNumber} onChange={(e) => setNewAccount({ ...newAccount, DDNumber: e.target.value })} />
                <label>Amount Paid</label>
                <input required type='text' value={newAccount.AmountPaid} onChange={(e) => setNewAccount({ ...newAccount, AmountPaid: e.target.value })} />
                <label>Date Paid</label>
                <input required type='date' value={newAccount.DatePaid} onChange={(e) => setNewAccount({ ...newAccount, DatePaid: e.target.value })} />
                <label>Payment Type</label>
                <select required value={newAccount.PaymentType} onChange={(e) => setNewAccount({ ...newAccount, PaymentType: e.target.value })}>
                    <option value='N/A'>N/A</option>
                    <option value='Challan'>Challan</option>
                    <option value='DD'>DD</option>
                    <option value='Online'>Online</option>
                </select>
                <br />
                <button type='submit'>Add Account</button>
            </form>

            {/* Specific student's accounts Page */}
            <center>
                <button style={{ backgroundColor: 'blueviolet', fontWeight: '600' }} onClick={() => navigate('/accounts/student')}>Search Students Accounts</button>
            </center>

            {/* All Accounts Display */}
            <h1>All Transaction Records</h1>
            <table>
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>DD Number</th>
                        <th>Amount Paid</th>
                        <th>Date Paid</th>
                        <th>Payment Type</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        accounts?.map((account, index) => {
                            return (
                                <tr key={index}>
                                    <td>{account.StudentID}</td>
                                    <td>{account.DDNumber}</td>
                                    <td>{account.AmountPaid}</td>
                                    <td>{new Date(account.DatePaid).toDateString()}</td>
                                    <td>{account.PaymentType}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    )
}

export default AccountsHome
