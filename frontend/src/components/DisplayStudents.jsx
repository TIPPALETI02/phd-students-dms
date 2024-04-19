import * as React from 'react';
import "../assets/css/DisplayStudents.css";
import { dateFormat } from '../util.js'

function StudentsDetail({ students }) {
    return (
        <div className="student-list-container">
            <table className="student-table">
                <thead className='students-data-head'>
                    <tr>
                        <th>Admission No</th>
                        <th>Name</th>
                        <th>Mode</th>
                        <th>Year</th>
                        <th>Branch</th>
                        <th>Guide ID</th>
                        <th>Co-Guide ID</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Gender</th>
                        <th>Category</th>
                        <th>Research Topic</th>
                        <th>Qualification</th>
                        <th>Date of Admission</th>
                        <th>Father/Husband</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {students?.map((student) => (
                        <tr key={student.admn_no}>
                            <td>{student.admn_no}</td>
                            <td>{student.name}</td>
                            <td>{student.mode}</td>
                            <td>{student.year}</td>
                            <td>{student.branch}</td>
                            <td>{student.guide_id}</td>
                            <td>{student.co_guide_id}</td>
                            <td>{student.phone}</td>
                            <td>{student.address}</td>
                            <td>{student.gender}</td>
                            <td>{student.category}</td>
                            <td>{student.research_topic}</td>
                            <td>{student.qualification}</td>
                            <td>{new Date(student.doa).toLocaleDateString()}</td>
                            <td>{student.fatherORhusband}</td>
                            <td>{student.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

// import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const FIELDS = ['admn_no', 'name', 'mode', 'year', 'branch', 'guide_name', 'co_guide_name', 'phone', 'gender', 'category', 'doa', 'research_topic', 'email', 'qualification', 'fatherORhusband', 'address', 'status'];

const VISIBLE_FIELDS = {
    admn_no: 'Admission No',
    name: 'Name',
    mode: 'PT/FT',
    year: 'Adm Year',
    branch: 'Branch',
    guide_name: 'Guide Name',
    co_guide_name: 'Co-Guide Name',
    phone: 'Phone',
    address: 'Address',
    gender: 'Gender',
    category: 'Category',
    research_topic: 'Research Topic',
    qualification: 'Qualification',
    doa: 'Date of Admission',
    fatherORhusband: 'Father/Husband/Gaurdian',
    status: 'Status',
    email: 'Email'
}

export default function StudentsDetails({ students }) {
    // console.log(students);
    return (
        <div style={{ width: '100%' }}>
            {
                students && <DataGrid
                    rows={students.map(student => ({
                        ...student,
                        gender: student.gender == 'Female' ? 'F' : student.gender == 'Male' ? 'M' : 'Other',
                        doa: dateFormat(student.doa),
                        email: student.email || '-'
                    }))} // Convert date to string
                    getRowId={(row) => row.admn_no}
                    columns={FIELDS.map(field => ({
                        field,
                        headerName: VISIBLE_FIELDS[field],
                        width: 150,
                    }))}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                />
            }
        </div>
    );
}
