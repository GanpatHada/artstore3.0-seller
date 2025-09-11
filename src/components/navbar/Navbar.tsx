import React, { type JSX } from 'react'
import mainLogo from '../../assets/Artstoreseller.svg'
import './Navbar.css'
import profile from '../../assets/profile-3.webp'
import { useSeller } from '../../contexts/SellerContext'
import { IoMdMenu } from 'react-icons/io'
import { IoSettings } from 'react-icons/io5'
import { MdMail } from 'react-icons/md'

type NavbarProps = {
    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar: React.FC<NavbarProps> = ({ setShowSidebar }): JSX.Element => {
    const { seller } = useSeller()
    return (
        <nav id='main-nav'>
            <button onClick={() => setShowSidebar(true)} id='menu'><IoMdMenu /></button>
            <section className="logo-section">
                <button id="main-logo">
                    <img src={mainLogo} alt="..." />
                </button>
            </section>
            <section>
                <button><MdMail /></button>
                <button><IoSettings /></button>
                <button id='user-profile'>
                    <img src={seller?.profileImage || profile} alt="" id="user-image" />
                </button>
            </section>
        </nav>
    )
}

export default Navbar
