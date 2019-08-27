import React from "react";
import 'materialize-css/dist/css/materialize.min.css'
import { Navbar, NavItem } from 'react-materialize';

export default function myNavbar() {
    return (
        <div className='Links'>

            <Navbar>
                <NavItem href={'/'}>Main Page</NavItem>
                <NavItem href={'/search'}>Search</NavItem>
                <NavItem href={'/company'}>Company</NavItem>
                <NavItem href={'/profile'}>Profile</NavItem>
                <NavItem href={'/messages/:id'}>Messages</NavItem>
                <NavItem href={'/signup'}> Registration</NavItem>
                <NavItem href={'/login'} >Login</NavItem>
                <NavItem href={'/logout'}>Logout</NavItem>
                <NavItem href={'/map'} >Map</NavItem>
            </Navbar>
        </div>
    )
}
