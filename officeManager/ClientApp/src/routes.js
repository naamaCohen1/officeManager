import Statistics from "views/Statistics.js";
import UserProfile from "views/UserProfile.js";
import HealthAvailabilityCertification from "views/HealthAvailabilityCertification.js";
import CommingToOffice from "views/CommingToOffice.js";
import OfficeEmployees from "./views/OfficeEmployees";
import OfficeInfo from "./views/OfficeInfo";
import Login from "./views/Login";

const dashboardRoutes = [
    {
        path: "/login",
        name: "Login",
        icon: "nc-icon nc-send",
        component: Login,
        layout: "/admin",
    },
    {
        path: "/statistics",
        name: "Statistics",
        icon: "nc-icon nc-chart-pie-35",
        component: Statistics,
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
        path: "/health-availability-certification",
        name: "Health Availability Certification",
        icon: "nc-icon nc-favourite-28",
        component: HealthAvailabilityCertification,
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
        icon: "nc-icon nc-bank",
        component: OfficeInfo,
        layout: "/admin",
    },
];

export default dashboardRoutes;
