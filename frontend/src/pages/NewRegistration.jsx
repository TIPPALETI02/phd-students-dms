import React, { useState } from 'react';
import '../assets/css/addstudentstyle.css'

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
            <div className="form-group">
          <label htmlFor="admn_no">Admission Number:</label>
          <input type="text" id="admn_no" name="admn_no" required />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="mode">Mode:</label>
          <select id="mode" name="mode">
            <option value="PartTime">PartTime</option>
            <option value="FullTime">FullTime</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="year">Year:</label>
          <input type="text" id="year" name="year" />
        </div>
        <div className="form-group">
          <label htmlFor="branch">Branch:</label>
          <select id="branch" name="Branch">
            <option value="CE">CE</option>
            <option value="EEE">EEE</option>
            <option value="ME">ME</option>
            <option value="ECE">ECE</option>
            <option value="CSE">CSE</option>
            <option value="Chemical Engineering">Chemical Engineering</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Chemical">Chemical</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="guide_id">Guide ID:</label>
          <input type="text" id="guide_id" name="guide_id" />
        </div>
        <div className="form-group">
          <label htmlFor="co_guide_id">Co-Guide ID:</label>
          <input type="text" id="co_guide_id" name="co_guide_id" />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input type="text" id="phone" name="phone" />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select id="gender" name="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input type="text" id="category" name="category" />
        </div>
        <div className="form-group">
          <label htmlFor="research_topic">Research Topic:</label>
          <input type="text" id="research_topic" name="research_topic" />
        </div>
        <div className="form-group">
          <label htmlFor="qualification">Qualification:</label>
          <input type="text" id="qualification" name="qualification" />
        </div>
        <div className="form-group">
          <label htmlFor="doa">Date of Admission:</label>
          <input type="date" id="doa" name="doa" />
        </div>
        <div className="form-group">
          <label htmlFor="fatherORhusband">Father/Husband Name:</label>
          <input type="text" id="fatherORhusband" name="fatherORhusband" />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <input type="text" id="status" name="status" value="enrolled" readOnly />
        </div>
        <button type="submit">Add Student</button>
        </form>
    );
};

export default AddStudentForm;