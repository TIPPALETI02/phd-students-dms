import React, { useState } from 'react';
import '../assets/css/addstudentstyle.css';


const AddStudentForm = ({ onAddStudent }) => {
  
    const [newStudent, setNewStudent] = useState({
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
        status: 'enrolled',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudent({ ...newStudent, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can add further validation here if needed

        // Call the callback function passed as a prop to add the new student
        onAddStudent(newStudent);

        // Clear the form fields after submission
        setNewStudent({
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
            status: 'enrolled',
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Add input fields based on your student data structure */}
            <label>
                Admission Number:
                <input type="text" name="admn_no" value={newStudent.admn_no} onChange={handleInputChange} />
            </label>
            <label>
                Name:
                <input type="text" name="name" value={newStudent.name} onChange={handleInputChange} />
            </label>
            <label>
                Mode:
                <input type="text" name="mode" value={newStudent.mode} onChange={handleInputChange} />
            </label>
            <label>
                Year:
                <input type="text" name="year" value={newStudent.year} onChange={handleInputChange} />
            </label>
            <label>
                Branch:
                <input type="text" name="branch" value={newStudent.branch} onChange={handleInputChange} />
            </label>
            <label>
                Guide ID:
                <input type="text" name="guide_id" value={newStudent.guide_id} onChange={handleInputChange} />
            </label>
            <label>
                Co-Guide ID:
                <input type="text" name="co_guide_id" value={newStudent.co_guide_id} onChange={handleInputChange} />
            </label>
            <label>
                Phone:
                <input type="text" name="phone" value={newStudent.phone} onChange={handleInputChange} />
            </label>
            <label>
                Email:
                <input type="text" name="email" value={newStudent.email} onChange={handleInputChange} />
            </label>
            <label>
                Address:
                <input type="text" name="address" value={newStudent.address} onChange={handleInputChange} />
            </label>
            <label>
                Gender:
                <input type="text" name="gender" value={newStudent.gender} onChange={handleInputChange} />
            </label>
            <label>
                Category:
                <input type="text" name="category" value={newStudent.category} onChange={handleInputChange} />
            </label>
            <label>
                Research Topic:
                <input type="text" name="research_topic" value={newStudent.research_topic} onChange={handleInputChange} />
            </label>
            <label>
                Qualification:
                <input type="text" name="qualification" value={newStudent.qualification} onChange={handleInputChange} />
            </label>
            <label>
                Date of Admission:
                <input type="text" name="doa" value={newStudent.doa} onChange={handleInputChange} />
            </label>
            <label>
                Father/Husband Name:
                <input type="text" name="fatherORhusband" value={newStudent.fatherORhusband} onChange={handleInputChange} />
            </label>

            <button type="submit">Add Student</button>
        </form>
    );
};

export default AddStudentForm;

