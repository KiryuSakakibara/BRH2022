import React from 'react';

function NavBar() {
    return (
        <nav className = "navigation"> 
            <ul>
                <li> <a href="/"> Home </a> </li>
                <li> <a href="/items"> All Items </a> </li>
                <li> <a href="/recipes"> Recipes </a> </li>
            </ul> 
        </nav>
    )
}

export default NavBar; 