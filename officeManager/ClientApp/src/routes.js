import Statistics from "views/Statistics.js";
import UserProfile from "views/UserProfile.js";
import HealthAvailabilityCertification from "views/HealthAvailabilityCertification.js";
import ComingToOffice from "views/ComingToOffice.js";
import OfficeEmployees from "./views/OfficeEmployees";
import OfficeInfo from "./views/OfficeInfo";
import Login from "./views/Login";
import SendAnEmail from "./views/SendAnEmail";
import Offices from "./views/Offices";

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
        path: "/coming-to-office",
        name: "Coming To The Office",
        icon: "nc-icon nc-pin-3",
        component: ComingToOffice,
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
    {
        path: "/send-mail",
        name: "Send An Email",
        icon: "nc-icon nc-email-85",
        component: SendAnEmail,
        layout: "/admin",
    },
    {
        path: "/offices",
        name: "Offices",
        icon: "nc-icon nc-bullet-list-67",
        component: Offices,
        layout: "/admin",
    },
];

export default dashboardRoutes;
