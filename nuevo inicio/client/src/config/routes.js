//Layout
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/LayoutBasic";

//Admin pages
import AdminHome from "../pages/Admin";
import AdminSingIn from "../pages/Admin/Signin";

//Client pages
import Home from "../pages/Home";
import Contact from "../pages/Contact";

//other
import Error404 from "../pages/Error404";

const routesAdmin = [
    {
        path: "/admin",
        layout: LayoutAdmin,
        component: AdminHome        
    },
    {
        path: "/admin/login",
        layout: LayoutAdmin,
        component: AdminSingIn
    },
    {
        layout: LayoutAdmin,
        component: Error404
    }
];
const routesClient = [
    {
        path: "/",
        layout: LayoutBasic,
        component: Home,
    },
    {
        path: "/contact",
        layout: LayoutBasic,
        component: Contact,
    }
];

const routes =[...routesAdmin, ...routesClient];
    

export default routes;