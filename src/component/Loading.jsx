import React from 'react'

export default function Loading() {
    return (
        <div style={{
            position: "absolute",
            zIndex: 300,
            width: "100dvw",
            background: "#0000007f",
            height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"
        }}>
            <div className="spinner-border text-warning" style={{ zIndex: 1000 }} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}



