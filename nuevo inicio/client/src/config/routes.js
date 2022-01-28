//Layout
import Layout from "antd/lib/layout/layout";
import LayoutAdmin from "../layouts/LayoutAdmin";

//Admin pages
import AdminHome from "../pages/Admin";
import AdminSingIn from "../pages/Admin/Signin";


function Routes1(){
    let routes = useRoutes([
        {
            path: "/admin",
            element: <LayoutAdmin/>,
            exact: false,
            children:[
                {
                    path: "/admin",
                    element: <AdminHome/>,
                    exact: true
                },
                {
                    path: "/admin/login",
                    element: <AdminSingIn/>,
                    exact: true
                }
            ]
        }
    ]);
    return routes;
}

export default Routes1;