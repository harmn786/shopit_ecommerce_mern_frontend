import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const SideMenu = ({menuItems}) => {
    const location = useLocation()
   
    const [activeMenuItem,setActiveMenuItem] = useState(location.pathname);
    const handleMenuItemClick=(menuItemUrl)=>{
        setActiveMenuItem(menuItemUrl);
    }
  return (
    <div className="list-group mt-5 pl-4">
        {menuItems.map((menuItem,index)=>(
             <Link
             key={index}
        to={menuItem.url}
        onClick={()=>handleMenuItemClick(menuItem.url)}
        className={`fw-bold list-group-item list-group-item-action ${activeMenuItem.includes(menuItem.url)?'active':''} `}
        aria-current={activeMenuItem.includes(menuItem.url)?'true':'false'}
      >

        <i className={`menu-item-icon-1 ${menuItem.icon} pe-2`}></i> {menuItem.name}
      </Link>  
        ))}
    </div>
  )
}

export default SideMenu
