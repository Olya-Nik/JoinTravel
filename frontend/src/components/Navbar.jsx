import React, { Component } from "react";
import { NavLink } from 'react-router-dom';


export default function Navbar() {
    return (
        <div className='Links'>
            <NavLink activeClassName={'Active'} exact={true} to={'/main'}>Main Page||</NavLink>
            <NavLink activeClassName={'Active'} exact={true} to={'/search'}>Search||</NavLink>
            <NavLink activeClassName={'Active'} exact={true} to={'/company'}>Company||</NavLink>
            <NavLink activeClassName={'Active'} exact={true} to={'/profile'}>Profile||</NavLink>
        </div>
    )

}