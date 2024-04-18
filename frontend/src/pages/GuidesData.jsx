import React from 'react'

function GuidesData() {

    const [guides, setGuides] = React.useState(null);
    const [updatingGuide, setUpdatingGuide] = React.useState(null);
    const [updating, setUpdating] = React.useState(null);

    React.useEffect(() => {
        fetch('http://localhost:5000/guides', {
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
                setGuides(data.guides);
            })
            .catch(err => console.log(err));
    }, []);

    // const updateAdmin = (admin) => {
    //     console.log(admin);
    //     const updatedAdmins = guides.map(ad => {
    //         if (ad.admin_id === guides.admin_id) {
    //             return admin;
    //         }
    //         return ad;
    //     });
    //     setGuides(updatedAdmins);
    //     fetch(`http://localhost:5000/admins/${admin.admin_id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${localStorage.getItem('token')}`
    //         },
    //         body: JSON.stringify(admin)
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //             alert('Admin updated successfully!');
    //         })
    //         .catch(err => console.log(err));
    // };

    // const deleteAdmin = (admin_id) => {
    //     const updatedAdmins = admins.filter(ad => ad.admin_id !== admin_id);
    //     setAdmins(updatedAdmins);
    //     fetch(`http://localhost:5000/admins/${admin_id}`, {
    //         method: 'DELETE',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${localStorage.getItem('token')}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //             alert('Admin deleted successfully!');
    //         })
    //         .catch(err => console.log(err));
    // };

    // const addAdmin = (admin) => {
    //     const updatedAdmins = [...admins, admin];
    //     setAdmins(updatedAdmins);
    //     fetch(`http://localhost:5000/admins/add`, {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${localStorage.getItem('token')}`
    //         },
    //         body: JSON.stringify(admin)
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //             alert('Admin added successfully!');
    //         })
    //         .catch(err => console.log(err));
    // };

    // "guides": [
    //     {
    //       "guide_id": 0,
    //       "name": "N/A",
    //       "designation": "N/A",
    //       "college": "N/A"
    //     },
    //     {
    //       "guide_id": 1,
    //       "name": "C. Subhas",
    //       "designation": "Professor",
    //       "college": "ECE, Sree Vidyanikethan Engineering College"
    //     },
    //     {
    //       "guide_id": 2,
    //       "name": "D. Vishu Vardhan",
    //       "designation": "Asst. Professor",
    //       "college": "ECE, JNTUACEA"
    //     },
    //     {
    //       "guide_id": 3,
    //       "name": "S. Govinda Rajulu",
    //       "designation": "Professor",
    //       "college": "ECE, Pulla Reddy Engineeirng College"
    //     },
    //     {
    //       "guide_id": 4,
    //       "name": "M. L. Ravi Chandra",
    //       "designation": "Asst. Professor",
    //       "college": "ECE, JNTUACEA"
    //     },
    //     {
    //       "guide_id": 5,
    //       "name": "G. Mamatha",
    //       "designation": "Asst. Professor",
    //       "college": "ECE, JNTUACEA"
    //     }
    // ]

    return (
        <div>
            <h1>Guides Data</h1>

            {/* Guides Update, Read and Delete Operations */}
            <div>
                <center>
                    <h2>All Guides</h2>
                </center>
                <table>
                    <thead>
                        <tr>
                            <th>Guide ID</th>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>College</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            guides && guides.map(guide => {
                                if (updating === guide.guide_id) {
                                    return (
                                        <tr key={guide.guide_id}>
                                            <td>{guide.guide_id}</td>
                                            <td><input type="text" name="name" defaultValue={guide.name} required /></td>
                                            <td><input type="text" name="designation" defaultValue={guide.designation} required /></td>
                                            <td><input type="text" name="college" defaultValue={guide.college} required /></td>
                                            <td>
                                                <button onClick={() => {
                                                    setUpdating(null);
                                                }}>Update</button>
                                                <button onClick={() => setUpdating(null)}>Cancel</button>
                                            </td>
                                        </tr>
                                    )
                                }
                                else {
                                    return (
                                        <tr key={guide.guide_id}>
                                            <td>{guide.guide_id}</td>
                                            <td>{guide.name}</td>
                                            <td>{guide.designation}</td>
                                            <td>{guide.college}</td>
                                            <td>
                                                <button onClick={() => {
                                                    setUpdating(guide.guide_id);
                                                }}>Update</button>
                                                {/* <button onClick={() => {
                                                    deleteGuide(guide.guide_id);
                                                }}>Delete</button> */}
                                            </td>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </tbody>
                </table>

                {/* Add New Guides */}
                <center>
                    <h2>Add New Guide</h2>
                </center>

                {/* styled form */}
                <form onSubmit={(e) => {
                    e.preventDefault();
                    // addAdmin({
                    //     name: document.querySelector('input[name="name"]').value,
                    //     email: document.querySelector('input[name="email"]').value,
                    //     password: document.querySelector('input[name="password"]').value,
                    //     role: document.querySelector('select[name="role"]').value,
                    //     access: document.querySelector('select[name="access"]').value
                    // });
                }}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" required />
                    <label htmlFor="designation">Designation:</label>
                    <input type="text" name="designation" required />
                    <label htmlFor="college">College:</label>
                    <input type="text" name="college" required />
                    <button type="submit">Add Guide</button>
                </form>
            </div >
        </div >
    )
}

export default GuidesData;
