import React, { type JSX } from 'react'
import './Sidebar.css'
import { IoIosAddCircle, IoIosHelpCircle, IoMdClose,IoMdListBox } from 'react-icons/io'
import { Link } from 'react-router-dom'
import {IoSettingsSharp, IoStorefrontSharp } from 'react-icons/io5'
import { MdDashboard } from 'react-icons/md'

type SidebarProps = {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar: React.FC<SidebarProps> = ({ setShowSidebar }): JSX.Element => {
  const handleLinkClick = (e: React.MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLElement
    if (target.tagName === 'A') {
      setShowSidebar(false)
    }
  }

  return (
    <div id="sidebar-layover" onClick={() => setShowSidebar(false)}>
      <nav id="sidebar" onClick={(e) => e.stopPropagation()}>
        <header>
          <h5>Menu</h5>
          <button onClick={() => setShowSidebar(false)}>
            <IoMdClose />
          </button>
        </header>
        <main>
          <ul onClick={handleLinkClick}>
            <li><Link to="/"><i className='icon'><MdDashboard /></i>Dashboard</Link></li>
            <li><Link to="/list-product"><i className='icon'><IoIosAddCircle /></i>List Product</Link></li>
            <li><Link to="/my-products"><i className='icon'><IoMdListBox /></i> My Products</Link></li>
            <li><Link to="/my-store"> <i className="icon"><IoStorefrontSharp /></i>My Store</Link></li>
            <li><Link to="/help"><i className="icon"><IoIosHelpCircle /></i> Help</Link></li>
            <li><Link to="/settings"><i className="icon"><IoSettingsSharp /></i> Settings</Link></li>
          </ul>
        </main>
      </nav>
    </div>
  )
}

export default Sidebar
