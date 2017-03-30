import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Login from 'Components/Login';
import CONFIG from 'Config';
import SX from './style';

/*
 *  navbar
 */
const Navbar = () => (
  <nav style={SX.navbar}>
    <Navlinks />
    <Navlogin />
  </nav>
)

/*
 *  navbar links
 */
const Navlinks = () => (
  <div style={SX.navgroup}>
    {CONFIG.ROUTES.map((route, i) => (
      <NavLink
        key={i}
        to={route.path}
        exact={route.exact}
        style={SX.navlinks}
        activeStyle={SX.isactive}>
        {route.title}
      </NavLink>
    ))}
  </div>
)

/*
 *  navbar login
 */
const Navlogin = () => (
  <div style={{...SX.navgroup, ...SX.navlogin}}>
    <Login style={SX.navlinks}/>
  </div>
)

export default Navbar;
