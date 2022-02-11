import React from "react";
import {Link, withRouter} from "react-router-dom";
import {Layout, Menu} from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import './MenuSider.scss';

export default function MenuSider(props){
    const {menuCollapsed} = props;
    const {Sider} = Layout;

    return (
        <Sider className="admin-sider" collapsed={menuCollapsed}>
            <Menu mode="inline" className="admin-sider__option">
                <Menu.Item key="1" >
                    <Link to={"/admin"}>
                    <HomeOutlined className="nav-text" />
                    <span className="nav-text">Home</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to={"/admin/users"}>
                    <UserOutlined  className="nav-text" />
                    <span className="nav-text">Usuarios</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to={"/admin/register"}>
                    <UserOutlined className="nav-text"  />
                    <span className="nav-text">Registrar usuarios</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}