import React, { type JSX } from 'react'
import './Dashboard.css'

const Highlights = () => {
    return (
        <div className="highlight">
            <header>
                <h5>Total Listed Products</h5>
            </header>
            <main>
                <p>15</p>
            </main>
        </div>
    )
}

const Dashboard: React.FC = (): JSX.Element => {
    return (
        <div id='dashboard'>
            <header>
                <Highlights />
                <Highlights />
                <Highlights />
                <Highlights />
                <Highlights />
            </header>
            <main>

            </main>
        </div>
    )
}

export default Dashboard
