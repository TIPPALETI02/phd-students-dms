import React from 'react'

function AdminsData() {

    const [admins, setAdmins] = React.useState(null);
    const [updatingAdmin, setUpdatingAdmin] = React.useState(null);
    const [updating, setUpdating] = React.useState(null);

    React.useEffect(() => {
        fetch('http://localhost:5000/admins', {
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
                setAdmins(data.admins);
            })
            .catch(err => console.log(err));
    }, []);

    const updateAdmin = (admin) => {
        console.log(admin);
        const updatedAdmins = admins.map(ad => {
            if (ad.admin_id === admin.admin_id) {
                return admin;
            }
            return ad;
        });
        setAdmins(updatedAdmins);
        fetch(`http://localhost:5000/admins/${admin.admin_id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(admin)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                alert('Admin updated successfully!');
            })
            .catch(err => console.log(err));
    };

    const deleteAdmin = (admin_id) => {
        const updatedAdmins = admins.filter(ad => ad.admin_id !== admin_id);
        setAdmins(updatedAdmins);
        fetch(`http://localhost:5000/admins/${admin_id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                alert('Admin deleted successfully!');
            })
            .catch(err => console.log(err));
    };

    const addAdmin = (admin) => {
        const updatedAdmins = [...admins, admin];
        setAdmins(updatedAdmins);
        fetch(`http://localhost:5000/admins/add`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(admin)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                alert('Admin added successfully!');
            })
            .catch(err => console.log(err));
    };

    // {
    //     "admins": [
    //         {
    //             "admin_id": 1,
    //             "name": "Director",
    //             "email": "super-admin@rnd.jntua.ac.in",
    //             "password": "Admin@123",
    //             "role": "Super_Admin",
    //             "access": "All"
    //         },
    //         {
    //             "admin_id": 2,
    //             "name": "Registrations",
    //             "email": "registrations@rnd.jntua.ac.in",
    //             "password": "Registrations@123",
    //             "role": "Admin",
    //             "access": "Registration"
    //         },
    //         {
    //             "admin_id": 3,
    //             "name": "Extensions",
    //             "email": "extensions@rnd.jntua.ac.in",
    //             "password": "Extensions@123",
    //             "role": "Admin",
    //             "access": "Extension"
    //         },
    //         {
    //             "admin_id": 4,
    //             "name": "Accounts",
    //             "email": "accounts@rnd.jntua.ac.in",
    //             "password": "Accounts@123",
    //             "role": "Admin",
    //             "access": "Accounts"
    //         },
    //         {
    //             "admin_id": 5,
    //             "name": "Viva Voce",
    //             "email": "vivavoce@rnd.jntua.ac.in",
    //             "password": "Vivavoce@123",
    //             "role": "Admin",
    //             "access": "Vivavoce"
    //         }
    //     ]
    // }

    return (
        <div>
            <h1>Admins Data Page</h1>

            {/* Admin Update, Read and Delete Operations */}
            <div>
                <h2>Admins</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Admin ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Role</th>
                            <th>Access</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            admins && admins.map(admin => {
                                if (updating === admin.admin_id) {
                                    return (
                                        <tr key={admin.admin_id}>
                                            <td>{admin.admin_id}</td>
                                            <td><input name='name' type="text" defaultValue={admin.name} /></td>
                                            <td><input name='email' type="email" defaultValue={admin.email} /></td>
                                            <td><input name='password' type="password" defaultValue={admin.password} /></td>
                                            <td><select name='role' defaultValue={admin.role}>
                                                <option value="Super_Admin">Super Admin</option>
                                                <option value="Admin">Admin</option>
                                            </select></td>
                                            <td>
                                                <select name='access' defaultValue={admin.access}>
                                                    <option value="All">All</option>
                                                    <option value="Registration">Registration</option>
                                                    <option value="Extension">Extension</option>
                                                    <option value="Accounts">Accounts</option>
                                                    <option value="Vivavoce">Viva Voce</option>
                                                </select></td>
                                            <td>
                                                <button onClick={() => {
                                                    updateAdmin({
                                                        admin_id: admin.admin_id,
                                                        name: document.querySelector('input[name="name"]').value,
                                                        email: document.querySelector('input[name="email"]').value,
                                                        password: document.querySelector('input[name="password"]').value,
                                                        role: document.querySelector('select[name="role"]').value,
                                                        access: document.querySelector('select[name="access"]').value
                                                    });
                                                    setUpdating(null);
                                                }}>Update</button>
                                                <button onClick={() => setUpdating(null)}>Cancel</button>
                                            </td>
                                        </tr>
                                    )
                                }
                                else {
                                    return (
                                        <tr key={admin.admin_id}>
                                            <td>{admin.admin_id}</td>
                                            <td>{admin.name}</td>
                                            <td>{admin.email}</td>
                                            {/* <td>{admin.password}</td> */}
                                            <td>********</td>
                                            <td>{admin.role}</td>
                                            <td>{admin.access}</td>
                                            <td>
                                                <button onClick={() => setUpdating(admin.admin_id)}>Update</button>
                                                <button onClick={() => deleteAdmin(admin.admin_id)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </tbody>
                </table>

                {/* Add New Admin */}
                <center>
                    <h2>Add New Admin</h2>
                </center>

                {/* styled form */}
                <form onSubmit={(e) => {
                    e.preventDefault();
                    addAdmin({
                        name: document.querySelector('input[name="name"]').value,
                        email: document.querySelector('input[name="email"]').value,
                        password: document.querySelector('input[name="password"]').value,
                        role: document.querySelector('select[name="role"]').value,
                        access: document.querySelector('select[name="access"]').value
                    });
                }}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name" required />
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" required />
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" required />
                    <label htmlFor="role">Role:</label>
                    <select name="role" id="role" required>
                        <option value="Super_Admin">Super Admin</option>
                        <option value="Admin">Admin</option>
                    </select>
                    <label htmlFor="access">Access:</label>
                    <select name="access" id="access" required>
                        <option value="All">All</option>
                        <option value="Registration">Registration</option>
                        <option value="Extension">Extension</option>
                        <option value="Accounts">Accounts</option>
                        <option value="Vivavoce">Viva Voce</option>
                    </select>
                    <button type="submit">Add Admin</button>
                </form>

            </div>

        </div>
    )
}

export default AdminsData
