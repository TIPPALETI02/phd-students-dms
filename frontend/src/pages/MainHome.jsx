import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Registrationlogo from '../assets/images/Registrations.png';
import Accountlogo from '../assets/images/Accounts.png';
import Vivavocelogo from '../assets/images/Vivavoce.png';
import moveForwardLogo from '../assets/images/feather-chevron-right-icon.png'
import '../assets/css/MainHome.css';

function MainHome() {
    const navigate = useNavigate();
    const [admin, setAdmin] = React.useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token == undefined) {
            navigate('/login');
        }
        document.title = 'Home | PhD Students DMS'
        setAdmin(JSON.parse(localStorage.getItem('admin')));

    }, []);

    const navigateToSection = (loc) => {
        if (admin.access == 'All' || admin.access == loc) {
            navigate(loc);
            return
        } else {
            alert('You must be an ' + loc + ' admin to access this section');
        }
    };

    return (
        <div className="homepage-main-container">
            <div className="homepage-header-container">
                <div className="homepage-title">Ph.D Students Data Management System</div>
                <div className="homepage-subtitle">{admin?.access == 'All' ? admin?.role.replace('_', ' ') : admin?.access + ' ' + admin?.role}</div>
            </div>
            <div className='admin-sections'>
                <div title='Registrations Section' className={`registrations admin-section ${(admin?.access == 'All' || admin?.access == 'Registration') ? '' : 'masked'}`} onClick={() => { navigateToSection('Registration') }}>
                    <div className='each-section-heading'>
                        <img src={Registrationlogo} alt='Registrations' />
                        <h2>Registrations</h2>
                        <img style={{ width: '20px', height: '40px', marginTop: '20px' }} src={moveForwardLogo} alt='Go to Section' />
                    </div>
                    <p style={{ color: 'black' }}>
                        Student Admissions, Pre PhD Courses, Guides & Co-Guides Management
                    </p>
                </div>
                <div title='Extensions Section' className={`extensions admin-section ${(admin?.access == 'All' || admin?.access == 'Extension') ? '' : 'masked'}`} onClick={() => { navigateToSection('Extension') }}>
                    <div className='each-section-heading'>
                        <img src={Registrationlogo} alt='Extensions' />
                        <h2>Extensions & Cancellations</h2>
                        <img style={{ width: '20px', height: '40px', marginTop: '20px' }} src={moveForwardLogo} alt='Go to Section' />
                    </div>
                    <p style={{ color: 'black' }}>
                        Students PhD Extensions, Cancellations and Verification
                    </p>
                </div>
                <div title='Accounts Section' className={`accounts admin-section ${(admin?.access == 'All' || admin?.access == 'Accounts') ? '' : 'masked'}`} onClick={() => { navigateToSection('Accounts') }}>
                    <div className='each-section-heading'>
                        <img src={Accountlogo} alt='Accounts' />
                        <h2>Accounts</h2>
                        <img style={{ width: '20px', height: '40px', marginTop: '20px' }} src={moveForwardLogo} alt='Go to Section' />
                    </div>
                    <p style={{ color: 'black' }}>
                        Student Accounts, Yearly Fees, Dues and Fine evaluation
                    </p>
                </div>
                <div title='Vivavoce Section' className={`vivavoce admin-section ${(admin?.access == 'All' || admin?.access == 'Vivavoce') ? '' : 'masked'}`} onClick={() => { navigateToSection('Vivavoce') }}>
                    <div className='each-section-heading'>
                        <img src={Vivavocelogo} alt='Viva voce' />
                        <h2>Viva voce</h2>
                        <img style={{ width: '20px', height: '40px', marginTop: '20px' }} src={moveForwardLogo} alt='Go to Section' />
                    </div>
                    <p style={{ color: 'black' }}>
                        Pre Talk, Thesis Submission, Plagiarism Check and Viva voce
                    </p>
                </div>
            </div>
        </div>
    );
}

export default MainHome;