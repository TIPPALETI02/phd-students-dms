import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import '../assets/css/newStudent.css';

const AddStudentForm = () => {
    const navigate = useNavigate();

    const { control, handleSubmit, setValue } = useForm();

    const [studentData, setStudentsData] = useState(null);
    const [guidesData, setGuidesData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const guides = await getGuidesData();
            setGuidesData(guides.guides);
        };
        fetchData();
    }, []);

    const [formData, setFormData] = useState({
        admn_no: '',
        name: '',
        mode: '',
        year: '',
        branch: '',
        guide_id: '',
        co_guide_id: '',
        phone: '',
        email: '',
        address: '',
        gender: '',
        category: '',
        research_topic: '',
        qualification: '',
        doa: '',
        fatherORhusband: '',
        status: 'enrolled'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const getGuidesData = async () => {
        try {
            const response = await fetch('http://localhost:5000/guides', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                        `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.json();
        } catch (error) {
            console.error('Error fetching guides:', error);
            alert('Error fetching guides:', error.message);
            navigate('/registration');
        }
    };

    const handleAddStudent = async (data) => {
        try {
            const response = await fetch('http://localhost:5000/students/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                        `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Student added successfully!');
                navigate('/registration');
                // You may want to update the UI or perform additional actions upon success

            } else {
                console.error('Error adding student:', response.statusText);
                // Handle error scenarios
                alert('Error adding student:', response.statusText);
                navigate('/registration');
            }
        } catch (error) {
            console.error('Error adding student:', error);
            // Handle error scenarios
            alert('Error adding student:', error.message);
            navigate('/registration');
        }
    };

    {/* 
            Student data schema for form validation:
    {
        "admn_no": "18PH0406",
        "name": "Uppana Sudha Rani",
        "mode": "PT",
        "year": 2018,
        "branch": "ECE",
        "guide_id": 1,
        "co_guide_id": 0,
        "phone": "8463948796",
        "address": "Flat No. 103, Asst Professors Quarters, JNTUA Kalikiri",
        "gender": "Female",
        "category": "BC-D",
        "research_topic": "N/A",
        "qualification": "M.Tech",
        "doa": "2019-01-27T18:30:00.000Z",
        "fatherORhusband": "U. Venkata Ravi",
        "status": "enrolled"
    }
 */}

    return (
        <form onSubmit={handleSubmit(handleAddStudent)} className="add-student-form">
            <h1>Add New Student</h1>
            <label className="form-label">
                Admission Number:
                <input required={true} type="text" name="admn_no" value={formData.admn_no} onChange={handleChange} />
            </label>
            <label className="form-label">
                Name:
                <input required={true} type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            <label className="form-label">
                Mode:
                <select required={true} name="mode" value={formData.mode} onChange={handleChange}>
                    <option value="FT">Full Time</option>
                    <option value="PT">Part Time</option>
                </select>
            </label>
            <label className="form-label">
                Year:
                <input required={true} type="number" name="year" value={formData.year} onChange={handleChange} />
            </label>
            <label className="form-label">
                Branch:
                <select required={true} name="branch" value={formData.branch} onChange={handleChange}>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="EEE">EEE</option>
                    <option value="MECH">MECH</option>
                    <option value="CIVIL">CIVIL</option>
                    <option value="CHEM">CHEM</option>
                </select>
            </label>
            <label className="form-label">
                Guide :
                <select required={true} name="guide_id" value={formData.guide_id} onChange={handleChange}>
                    {guidesData?.map(guide => (
                        <option key={guide.guide_id} value={guide.guide_id}>{guide.name}</option>
                    ))}
                </select>
            </label>
            <label className="form-label">
                Co-Guide :
                <select required={true} name="co_guide_id" value={formData.co_guide_id} onChange={handleChange}>
                    {guidesData?.map(guide => (
                        <option key={guide.guide_id} value={guide.guide_id}>{guide.name}</option>
                    ))}
                </select>
            </label>
            <label className="form-label">
                Phone:
                <input required={true} type="text" name="phone" value={formData.phone} onChange={handleChange} />
            </label>
            <label className="form-label">
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </label>
            <label className="form-label">
                Address:
                <input required={true} type="text" name="address" value={formData.address} onChange={handleChange} />
            </label>
            <label className="form-label">
                Gender:
                <select required={true} name='gender' value={formData.gender} onChange={handleChange}>
                    <option value="male" selected>Male</option>
                    <option value="female" selected>Female</option>
                    <option value="other" selected>Others</option>
                </select>
            </label>
            <label className="form-label">
                Category:
                <input required={true} type="text" name="category" value={formData.category} onChange={handleChange} />
            </label>
            <label className="form-label">
                Research Topic:
                <input required={true} type="text" name="research_topic" value={formData.research_topic} onChange={handleChange} />
            </label>
            <label className="form-label">
                Qualification:
                <input required={true} type="text" name="qualification" value={formData.qualification} onChange={handleChange} />
            </label>
            <label className="form-label">
                Date of Admission:
                <input required={true} type="datetime-local" name="doa" value={formData.doa} onChange={handleChange} />
            </label>
            <label className="form-label">
                Father or Husband:
                <input required={true} type="text" name="fatherORhusband" value={formData.fatherORhusband} onChange={handleChange} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default AddStudentForm;
