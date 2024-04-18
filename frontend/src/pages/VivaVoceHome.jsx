import React from 'react'

function VivaVoceHome() {
    return (
        <div>
            Viva Voce Page
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
        </div>
    )
}

export default VivaVoceHome
