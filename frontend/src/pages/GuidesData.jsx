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

    const addGuide = () => {
        const name = document.querySelector('input[name="name"]').value;
        const designation = document.querySelector('input[name="designation"]').value;
        const college = document.querySelector('input[name="college"]').value;
        const guide = {
            name,
            designation,
            college
        }
        const updatedGuides = [...guides, guide];
        setGuides(updatedGuides);
        fetch(`http://localhost:5000/guides/add`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(guide)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                alert('Guide added successfully!');
            })
            .catch(err => console.log(err));
    }

    const updateGuide = (guide) => {
        const updatedGuides = guides.map(gd => {
            if (gd.guide_id === guide.guide_id) {
                return guide;
            }
            return gd;
        });
        setGuides(updatedGuides);
        fetch(`http://localhost:5000/guides/${guide.guide_id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(guide)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                alert('Guide updated successfully!');
            })
            .catch(err => console.log(err));
    };

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
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            guides && guides.map(guide => {
                                if (updating === guide.guide_id) {
                                    return (
                                        <tr key={guide.guide_id}>
                                            <td>{guide.guide_id}</td>
                                            <td><input type="text" name="gname" defaultValue={guide.name} required /></td>
                                            <td><input type="text" name="gdesignation" defaultValue={guide.designation} required /></td>
                                            <td><input type="text" name="gcollege" defaultValue={guide.college} required /></td>
                                            <td><input type="number" name="gphone" defaultValue={guide.phone} /></td>
                                            <td><input type="text" name="gemail" defaultValue={guide.email} /></td>
                                            <td>
                                                <button onClick={() => {
                                                    setUpdating(null);
                                                    const name = document.querySelector('input[name="gname"]').value;
                                                    const designation = document.querySelector('input[name="gdesignation"]').value;
                                                    const college = document.querySelector('input[name="gcollege"]').value;
                                                    const phone = document.querySelector('input[name="gphone"]').value;
                                                    const email = document.querySelector('input[name="gemail"]').value;
                                                    const updatedGuide = {
                                                        guide_id: guide.guide_id,
                                                        name,
                                                        designation,
                                                        college,
                                                        phone,
                                                        email
                                                    }
                                                    updateGuide(updatedGuide);
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
                                            <td>{guide.phone || 'N/A'}</td>
                                            <td>{guide.email || 'N/A'}</td>
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
                    addGuide();
                }}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" required />
                    <label htmlFor="designation">Designation:</label>
                    <input type="text" name="designation" required />
                    <label htmlFor="college">College:</label>
                    <input type="text" name="college" required />
                    <label htmlFor="phone">Phone:</label>
                    <input type="number" name="phone" />
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" />
                    <button type="submit">Add Guide</button>
                </form>
            </div >
        </div >
    )
}

export default GuidesData;
