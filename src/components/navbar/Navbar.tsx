import React, { type JSX } from 'react'
import mainLogo from '../../assets/Artstoreseller.svg'
import './Navbar.css'
import profile from '../../assets/profile.png'
import { useSeller } from '../../contexts/SellerContext'

const Navbar: React.FC = (): JSX.Element => {
    const {seller}=useSeller()
    return (
        <nav id='main-nav'>
            <section className="image-section">
                <img src={mainLogo} alt="..." />
            </section>
            <section className="info-section">
                <div id="user-info">
                    <img src={seller?.profileImage||profile} alt="" id="user-image" />
                    <div>
                        <h5>{seller?.fullName||" "}</h5>
                        <p>{seller?.email||" "}</p>
                    </div>
                </div>
                <button id='logout-btn'>Logout</button>
            </section>
        </nav>
    )
}

export default Navbar
