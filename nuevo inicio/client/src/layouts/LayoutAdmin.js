import React from "react";
import {Layout} from "antd";
import MenuTop from "../components/Admin/MenuTop/MenuTop";

import "./LayoutAdmin.scss";

export default function LayoutAdmin(props){
    const {children}=props;
    const {Header, Content, Footer}=Layout;

    return(
        <Layout>
            {/* TO DO: Menu sider */}
            <Layout className="layout-admin">
                <Header className="layout-admin__header"> 
                    <MenuTop/>
                </Header>    
                <Content className="layout-admin__content">
                    {children}
                </Content>
                <Footer className="layout-admin__footer">piedepagina..</Footer>
            </Layout> 
        </Layout>
    );
} 