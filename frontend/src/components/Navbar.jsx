import React from 'react';
import { Link } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import { Navbar } from 'react-materialize';

export default function myNavbar() {
  return (
    <div className="Links">
      <Navbar>
        <Link to={'/'}>Main Page</Link>
        <Link to={'/search'}>Search</Link>
        <Link to={'/company'}>Company</Link>
        <Link to={'/profile'}>Profile</Link>
        <Link to={'/messages'}>Messages</Link>
        <Link to={'/auth/signup'}>Sign Up</Link>
        <Link to={'/auth/login'}>Sign In</Link>
        <Link to={'/map'}>Map</Link>
      </Navbar>
    </div>
  );
}
