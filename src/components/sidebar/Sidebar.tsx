import React, { type JSX } from 'react'
import './Sidebar.css'
import { IoMdClose } from 'react-icons/io'
import { Link } from 'react-router-dom'

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
            <li><Link to="/list-product">List Product</Link></li>
            <li><Link to="/my-products">My Products</Link></li>
            <li><Link to="/my-account">My Account</Link></li>
            <li><Link to="/help">Help</Link></li>
            <li><Link to="/settings">Settings</Link></li>
          </ul>
        </main>
      </nav>
    </div>
  )
}

export default Sidebar
