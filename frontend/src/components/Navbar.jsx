import React, { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import { Navbar, NavItem } from 'react-materialize';


export default function myNavbar() {
    return (
        <div className='Links'>
            <Navbar centerLogo alignLinks="right">
                <NavItem href={'/main'}>Main Page</NavItem>
                <NavItem href={'/search'}>Search</NavItem>
                <NavItem href={'/company'}>Company</NavItem>
                <NavItem href={'/profile'}>Profile</NavItem>
                <NavItem href={'/registration'}> Registration</NavItem>
                <NavItem href={'/login'} >Login</NavItem>
                <NavItem href={'/logout'}>Logout</NavItem>
            </Navbar>
        </div>
    )

}
