import React, { Component } from "react";
import { useLocation, NavLink } from "react-router-dom";

import { Nav } from "react-bootstrap";

import logo from "assets/img/logo.png";

function Sidebar({ color, image, routes }) {
    var show = false;
    var loggedin = sessionStorage.getItem("loggedin");
    var admin = sessionStorage.getItem("admin");
    var super_admin = sessionStorage.getItem("super_admin");
    if (loggedin == null) {
        loggedin = false
        admin = false
        super_admin = false
    }

    const location = useLocation();
    const activeRoute = (routeName) => {
        return location.pathname.indexOf(routeName) > -1 ? "active" : "";
    };
    return (
        <div className="sidebar" data-image={image} data-color={color}>
            <div
                className="sidebar-background"
                style={{
                    backgroundImage: "url(" + image + ")",
                }}
            />
            <div className="sidebar-wrapper">
                <div className="logo d-flex align-items-center justify-content-start">
                    <a
                        className="simple-text logo-mini mx-1"
                    >
                        <div className="logo-img">
                            <img
                                src={require("assets/img/logo.png").default}
                                alt="..."
                            />
                        </div>
                    </a>
                    <a className="simple-text">
                        Office Manager
          </a>
                </div>
                <Nav>
                    {routes.map((prop, key) => {

                        if (!loggedin) {
                            if (prop.name == 'Login')
                                show = true
                            else
                                show = false
                        }
                        else {
                            if (super_admin === 'true') {
                                if (prop.name == 'Login')
                                    show = false
                                else if (prop.name == 'Offices')
                                    show = true
                                else if (prop.name == 'Employees')
                                    show = true
                                else
                                    show = false

                            }
                            else if (admin === 'true') {

                                if (prop.name == 'Login')
                                    show = false
                                else if (prop.name == 'Offices')
                                    show = false
                                else if (prop.name == 'Employees')
                                    show = false
                                else
                                    show = true
                            }
                            else {
                                if (prop.name == 'Login')
                                    show = false
                                else if (prop.name == 'Health Availability Certification')
                                    show = true
                                else if (prop.name == 'User Profile')
                                    show = true
                                else if (prop.name == 'Coming To The Office')
                                    show = true
                                else
                                    show = false
                            }
                        }

                        if (show) {
                            if (!prop.redirect)
                                return (
                                    <li
                                        className={
                                            prop.upgrade
                                                ? "active active-pro"
                                                : activeRoute(prop.layout + prop.path)
                                        }
                                        key={key}
                                    >
                                        <NavLink
                                            to={prop.layout + prop.path}
                                            className="nav-link"
                                            activeClassName="active"
                                        >
                                            <i className={prop.icon} />
                                            <p>{prop.name}</p>
                                        </NavLink>
                                    </li>
                                );
                        }
                        return null;
                    })}
                </Nav>
            </div>
        </div>
    );
}

export default Sidebar;
