import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css'
import { Navbar, NavItem } from 'react-materialize';


export default function myNavbar() {
    return (
        <div className='Links'>
            <Navbar  centerLogo alignLinks="right">
               
                <NavItem >
                    <NavLink activeClassName={'Active'} exact={true} to={'/main'}>Main Page</NavLink>
                </NavItem>
                <NavItem >
                    <NavLink activeClassName={'Active'} exact={true} to={'/search'}>Search</NavLink>
                </NavItem>
                <NavItem >
                    <NavLink activeClassName={'Active'} exact={true} to={'/company'}>Company</NavLink>
                </NavItem>
                <NavItem >
                    <NavLink activeClassName={'Active'} exact={true} to={'/profile'}>Profile</NavLink>
                </NavItem>
                <NavItem >
                    <NavLink activeClassName={'Active'} exact={true} to={'/registration'}>Registration</NavLink>
                </NavItem>
                <NavItem >
                    <NavLink activeClassName={'Active'} exact={true} to={'/login'}>Login</NavLink>
                </NavItem>
                <NavItem >
                    <NavLink activeClassName={'Active'} exact={true} to={'/logout'}>Logout</NavLink>
                </NavItem>
                <NavItem >
                    <NavLink activeClassName={'Active'} exact={true} to={'/map'}>Map</NavLink>
                </NavItem>
            </Navbar>
        </div>
    )

}
