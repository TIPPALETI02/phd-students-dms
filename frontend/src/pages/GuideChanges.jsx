import React, { useEffect, useState } from 'react'

function GuideChanges() {

    const [guideChanges, setGuideChanges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [openAdd, setOpenAdd] = useState(false);
    const [newChangeData, setNewChangeData] = useState({
        student_id: '',
        old_guide_id: '',
        new_guide_id: '',
        date_of_change: ''
    });
    const [allGuides, setAllguides] = useState([]);

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

    const getAllGuideChanges = () => {
        fetch('http://localhost:5000/guide_changes',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log('Guide changes data:', data);
                setGuideChanges(data.guide_changes);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching guide changes:', err);
                setLoading(false);
            });
    }

    useEffect(() => {
        document.title = 'Guide Changes | PhD Portal';

        // Fetch guide changes data
        getAllGuideChanges();

        // Fetch all guides data
        getGuidesData()
            .then(data => {
                console.log('Guides data:', data);
                setAllguides(data.guides);
            })
            .catch(err => {
                console.error('Error fetching guides:', err);
                alert('Error fetching guides:', err.message);
            });
    }, []);

    const getSearchedGuideChanges = (e) => {
        e.preventDefault();
        if (!searchText) return
        fetch(`http://localhost:5000/guide_changes/${searchText}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log('Guide changes data:', data);
                getAllGuideChanges();
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching guide changes:', err);
                setLoading(false);
            });
    }

    const addNewGuideChange = (e) => {
        e.preventDefault();
        console.log(newChangeData);
        fetch('http://localhost:5000/guide_changes/add',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(newChangeData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('New guide change added:', data);
                setOpenAdd(false);
                setNewChangeData({});
            })
    }

    return (
        <div>
            <h1>Guide Changes</h1>

            <form onSubmit={getSearchedGuideChanges}>
                <input type="text" placeholder="Search by student id" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                <button type="submit">Search</button>
            </form>

            <center style={{ margin: '20px' }}>
                <button type="button" onClick={() => setOpenAdd(prev => !prev)}>{openAdd ? 'Close' : 'Open'} Guide Change</button>
            </center>

            {openAdd && (
                <form onSubmit={addNewGuideChange}>
                    <input type="text" placeholder="Student ID" value={newChangeData.student_id} onChange={(e) => setNewChangeData(prev => ({ ...prev, student_id: e.target.value }))} />
                    {/* <input type="text" placeholder="New Guide ID" value={newChangeData.new_guide_id} onChange={(e) => setNewChangeData(prev => ({ ...prev, new_guide_id: e.target.value }))} /> */}
                    <select value={newChangeData.new_guide_id} onChange={(e) => setNewChangeData(prev => ({ ...prev, new_guide_id: e.target.value }))}>
                        <option value="">Select New Guide</option>
                        {allGuides.map((guide, index) => (
                            <option key={index} value={guide.guide_id}>{guide.name}</option>
                        ))}
                    </select>
                    <input type="date" value={newChangeData.date} onChange={(e) => setNewChangeData(prev => ({ ...prev, date_of_change: e.target.value }))} />
                    <button type="submit">Add Guide Change</button>
                </form>
            )}


            {loading ?
                <p>Loading guide changes...</p>
                : guideChanges.length > 0 ? (
                    (
                        <table>
                            <thead>
                                <tr>
                                    <th>Sl. No</th>
                                    <th>Student ID</th>
                                    <th>Old Guide</th>
                                    <th>New Guide</th>
                                    <th>Date Of Change</th>
                                </tr>
                            </thead>
                            <tbody>
                                {guideChanges.map((change, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{change.student_id}</td>
                                        <td>{change.old_guide_id.name}</td>
                                        <td>{change.new_guide_id.name}</td>
                                        <td>{new Date(change.date_of_change).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                ) : <center>
                    <h2>No Results Found</h2>
                </center>
            }

        </div>
    )
}

export default GuideChanges
