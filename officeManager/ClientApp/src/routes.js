/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import HealthCheck from "views/HealthCheck.js";
import CommingToOffice from "views/CommingToOffice.js";
import OfficeEmployees from "./views/OfficeEmployees";
import OfficeInfo from "./views/OfficeInfo";
import Login from "./views/Login";

//import {
//    AiFillCheckSquare,
//} from "react-icons";

const dashboardRoutes = [
    {
        path: "/login",
        name: "Login",
        icon: "nc-send",
        //icon: AiFillCheckSquare,
        component: Login,
        layout: "/admin",
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: "nc-icon nc-chart-pie-35",
        component: Dashboard,
        layout: "/admin",
    },
    {
        path: "/user",
        name: "User Profile",
        icon: "nc-icon nc-circle-09",
        component: UserProfile,
        layout: "/admin",
    },
    {
        path: "/health-check",
        name: "Health Check",
        icon: "nc-favourite-28",
        component: HealthCheck,
        layout: "/admin",
    },
    {
        path: "/comming-to-office",
        name: "Comming To The Office",
        icon: "nc-icon nc-pin-3",
        component: CommingToOffice,
        layout: "/admin",
    },
    {
        path: "/employees",
        name: "Office Employees",
        icon: "nc-icon nc-notes",
        component: OfficeEmployees,
        layout: "/admin",
    },
    {
        path: "/office-info",
        name: "Office Information",
        icon: "nc-bank",
        component: OfficeInfo,
        layout: "/admin",
    },
];

export default dashboardRoutes;
