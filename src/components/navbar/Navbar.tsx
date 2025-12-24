import React, { type JSX } from 'react'
import mainLogo from '../../assets/Artstoreseller.svg'
import './Navbar.css'
import profile from '../../assets/profile-3.webp'
import { useSeller } from '../../contexts/SellerContext'
import { IoMdMenu } from 'react-icons/io'
import { IoSettings } from 'react-icons/io5'
import { Link } from 'react-router-dom'

type NavbarProps = {
    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar: React.FC<NavbarProps> = ({ setShowSidebar }): JSX.Element => {
    const { seller } = useSeller()
    return (
        <nav id='main-nav'>
            <button onClick={() => setShowSidebar(true)} id='menu'><IoMdMenu /></button>
            <section className="logo-section">
                <Link to={"/"} id="main-logo">
                    <img src={mainLogo} alt="..." />
                </Link>
            </section>
            <section>
                <Link to={"/settings"}><IoSettings /></Link>
                <Link to={"/settings"} id='user-profile'>
                    <img src={seller?.profileImage || profile} alt="" id="user-image" />
                </Link>
            </section>
        </nav>
    )
}

export default Navbar
