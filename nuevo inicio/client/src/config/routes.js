//Layout
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/LayoutBasic";

//Admin pages
import AdminHome from "../pages/Admin";
import AdminSingIn from "../pages/Admin/Signin";
import AdminUsers from "../pages/Admin/Users";
import MenuWeb from "../pages/Admin/MenuWeb/MenuWeb";
//Client pages
import Home from "../pages/Home";
import Contact from "../pages/Contact";

//other
import Error404 from "../pages/Error404";
import Signin from "../pages/Admin/Signin";
import RegisterForm from "../components/Admin/RegisterForm/RegisterForm";

const routesAdmin = [
    {
        path: "/admin",
        layout: LayoutAdmin,
        component: AdminHome        
    },
    {
        path: "/admin/login",
        layout: Signin,
        component: AdminSingIn
    },
    {
        path: "/admin/users",
        layout: LayoutAdmin,
        component: AdminUsers,
        exact: true
    },
    {
        path: "/admin/register",
        layout: LayoutAdmin,
        component: RegisterForm,
        exact: true
    },
    {
        path: "/admin/menu",
        layout: LayoutAdmin,
        component: RegisterForm,
        exact: true
    },
    {
        path: "/admin/*",
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
    },
    {
        path: "/*",
        layout: LayoutBasic,
        component: Error404
    }
];

const routes =[...routesAdmin, ...routesClient];
    

export default routes;