import React, { useState } from 'react';
import jntuLogo from '../assets/images/Jntua.png'; // Add import for the JNTU logo

function App() {
    // State variables
    const [showExtensionForm, setShowExtensionForm] = useState(false);
    const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
    const [reasonForExtension, setReasonForExtension] = useState('');
    const [studentDetails, setStudentDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        enrollmentNumber: '',
        paidMinimumFee: false,
    });

    // Function to submit extension request
    const submitExtensionRequest = () => {
        console.log('Extension request submitted:', { reasonForExtension, studentDetails });
    };

    // Function to submit cancellation request
    const submitCancellationRequest = () => {
        if (studentDetails.paidMinimumFee) {
            console.log('Cancellation request submitted:', studentDetails);
        } else {
            console.error('Cancellation request cannot be submitted. Minimum fee not paid.');
        }
    };

    return (
        <div className="App" style={{ paddingBottom: '40px' }}>
            <header style={{ backgroundColor: '#3498db', color: '#fff', textAlign: 'center', padding: '1rem' }}>
                <img src={jntuLogo} alt="JNTUA Logo" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />

                <h2>Jawaharlal Nehru Technological University Anantapur</h2>
                <h3>Extension And Cancellation Of Ph.D Scholars</h3>

            </header>

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

            <button type="button" className="view-students" style={{
                backgroundColor: '#3498db',
                color: '#fff',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'block',
                margin: '20px auto'
            }} onClick={() => window.location.href = '/guides/changes'}>Change Guides Requests</button>


            {/* <main style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', backgroundColor: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '5px' }}>
                <h2>Welcome PhD Students!</h2>
                <p>Do you want to extend or cancel your enrollment in the PhD program?</p>
                <button onClick={() => setShowExtensionForm(true)}>Request Extension</button>
                <button onClick={() => setShowCancelConfirmation(true)}>Cancel Enrollment</button>

                {showExtensionForm && (
                    <div className="extension-form" style={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor="reason">Reason for Extension:</label>
                        <input
                            type="text"
                            id="reason"
                            placeholder="Enter your reason"
                            value={reasonForExtension}
                            onChange={(e) => setReasonForExtension(e.target.value)}
                        />

                        <button onClick={submitExtensionRequest} style={{ marginTop: '10px' }}>Submit Extension Request</button>
                    </div>
                )}

                {showCancelConfirmation && (
                    <div className="cancellation-form" style={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor="paidMinimumFee">Have you paid the minimum fee of 3000?</label>
                        <input
                            type="checkbox"
                            id="paidMinimumFee"
                            checked={studentDetails.paidMinimumFee}
                            onChange={() => setStudentDetails({ ...studentDetails, paidMinimumFee: !studentDetails.paidMinimumFee })}
                        />

                        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', marginTop: '10px' }}>
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                type="text"
                                id="firstName"
                                placeholder="Enter your first name"
                                value={studentDetails.firstName}
                                onChange={(e) => setStudentDetails({ ...studentDetails, firstName: e.target.value })}
                            />

                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                placeholder="Enter your last name"
                                value={studentDetails.lastName}
                                onChange={(e) => setStudentDetails({ ...studentDetails, lastName: e.target.value })}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', marginTop: '10px' }}>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={studentDetails.email}
                                onChange={(e) => setStudentDetails({ ...studentDetails, email: e.target.value })}
                            />

                            <label htmlFor="enrollmentNumber">Enrollment Number:</label>
                            <input
                                type="text"
                                id="enrollmentNumber"
                                placeholder="Enter your enrollment number"
                                value={studentDetails.enrollmentNumber}
                                onChange={(e) => setStudentDetails({ ...studentDetails, enrollmentNumber: e.target.value })}
                            />
                        </div>

                        <button onClick={submitCancellationRequest} style={{ marginTop: '10px' }}>Submit Cancellation Request</button>
                    </div>
                )}
            </main> */}
        </div>
    );
}

export default App;