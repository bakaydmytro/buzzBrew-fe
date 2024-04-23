import React from 'react'
import "./css/MainLayout.css"
import UserMenu from './UserMenu';

const HeaderContent = () => {
    return (
        <div className='header-container'>
            <UserMenu />
        </div>
    )
}

export default HeaderContent;