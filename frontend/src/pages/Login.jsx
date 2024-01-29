import * as React from "react";
import '../assets/css/Login.css'
import Jntua from '../assets/images/Jntua.png'
import { useNavigate } from 'react-router-dom';

function MyComponent(props) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();

    React.useEffect(() => {
        localStorage.removeItem('token');
    }, []);

    const loginHandler = () => {
        setError(null);
        if (email === '') {
            setError('Please enter email');
            return;
        }
        if (password === '') {
            setError('Please enter password');
            return;
        }
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then((res) => res.json())
            .then((data) => {
                // if (data.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('admin', JSON.stringify(data.admin));
                // } else {
                //     setError('Invalid email or password');
                // }
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
                setError('Error occurred while logging in');
            });
    }

    return (
        <div className="div">
            <div className="div-2">
                <img
                    loading="lazy"
                    srcSet={Jntua}
                    className="img"
                />
                <div className="div-3">
                    <div>
                        Jawaharlal Nehru Technological University, Anantapur
                    </div>
                    <div>
                        Reasearch and Development
                    </div>
                </div>
            </div>
            <div className="div-4">
                <div className="div-5">Ph.D Students Data Management System</div>
                <div className="div-6">Login to Get Started</div>
                <div className="div-7">Login to your Account</div>
                <div className="div-8">Email address</div>
                {/* <div className="div-9">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/ffce961e017ce79fd9c56d911cf733a2fe96e221693b6589391db4111ba5cb5b?"
                        className="img-2"
                    />
                    <input name="email" value={email} placeholder="admin@jntua.ac.in" className="div-10" style={{ backgroundColor: 'white' }} onChange={(e) => setEmail(e.target.value)} />
                </div> */}
                <input type="email" name="email" placeholder="Enter your email address" className="input-form" value={email} onChange={e => setEmail(e.target.value)} />
                <div className="div-8">Password</div>
                <input type="password" name="password" placeholder="Enter your password" className="input-form" value={password} onChange={e => setPassword(e.target.value)} />
                {/* <div className="div-12">
                    <div className="div-13">
                        <div className="div-14" />
                        <div className="div-15">Remember me</div>
                    </div>
                    <div className="div-16">Forgot Password?</div>
                </div> */}
                {
                    error && <p className="error">{error}</p>
                }
                <button onClick={loginHandler} className="div-17">Login</button>
            </div>
        </div >
    );
}

export default MyComponent;