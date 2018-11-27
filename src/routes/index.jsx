import Dashboard from "layouts/Dashboard.jsx";
import Sample from "layouts/Sample.jsx";
import Login from "layouts/Login.jsx";

const indexRoutes = [
                    { path: "/adminpanel", component: Dashboard },
                    { path: "/sample", component: Sample },
                    { path: "/", component: Login },
    
];

export default indexRoutes;
