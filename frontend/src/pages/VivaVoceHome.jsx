import React from 'react'

function VivaVoceHome() {
    return (
        <div style={{ paddingBottom: '30px' }}>
            <center>
                <h1>Viva Voce Home</h1>
            </center>
            <button type="button" className="view-students" style={{
                backgroundColor: '#3498db',
                color: '#fff',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'block',
                margin: '20px auto'
            }} onClick={() => window.location.href = '/students'}>View Students Data</button>

            <button type="button" className="view-students" style={{
                backgroundColor: '#3498db',
                color: '#fff',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'block',
                margin: '20px auto'
            }} onClick={() => window.location.href = '/vivavoce'}>Pre-Courses Section</button>
        </div>
    )
}

export default VivaVoceHome
