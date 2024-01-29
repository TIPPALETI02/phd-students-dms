import React, { useEffect } from 'react';
import DisplayStudents from '../components/DisplayStudents';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';



function RegistrationHome() {

    const [open, setOpen] = React.useState(false);
    const [studentsData, setStudentsData] = React.useState(null);
    const [totalStudents, setTotalStudents] = React.useState(null);

    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        document.title = 'Registrations | PhD Students DMS'
        fetch('http://localhost:5000/students', {
            method: 'GET',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setStudentsData(data.students);
                setTotalStudents(data.totalCount);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            Students Registration Page
            <DisplayStudents students={studentsData} />

            <button style={{ width: '120px', height: '30px', backgroundColor: 'beige', color: 'black', cursor: 'pointer' }} onClick={() => {
                navigate('/registrations/add')
            }}>Add New Student</button>
        </div>
    )
}

export default RegistrationHome
