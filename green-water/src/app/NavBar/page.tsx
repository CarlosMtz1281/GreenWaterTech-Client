import React from 'react';
import{AiFillHome} from 'react-icons/ai';
import{FiSettings} from 'react-icons/fi';

export default function NavBar(){
    return(
        <div className="NavContainer">
            <div className="nav-header">
                <h1 >Green Water <br/> Tech</h1>
            </div>

            <div className="nav-divider"/>

            <ul className="nav-links">
                <li className="nav-item">
                    <AiFillHome size={25}/>
                    <p>Home</p>
                </li>
                <li className="nav-item">
                    <FiSettings size={25}/>
                    <p>Settings</p>
                </li>

            </ul>

            <div className="nav-divider"/>

            <div className="nav-footer">
                <div className='logOut-btn'>
                    Log Out
                </div>
            </div>
            </div>
    )
}