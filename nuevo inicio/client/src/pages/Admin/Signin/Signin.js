import React from "react";
import {Layout, Tabs, Space} from 'antd';
import { Navigate } from "react-router-dom";
import Bird from '../../../assets/img/png/Bird2.png';
import Nissan from '../../../assets/img/png/nissan3.png';
import RegisterForm from "../../../components/Admin/RegisterForm/RegisterForm";

import './Signin.scss';

export default function Signin(){
    const {Content}=Layout;
    const {TabPane}=Tabs;

    return(
        <Layout className="sign-in">
            <Content className="sign-in__content">
                <h1 className="sign-in__content-logo">
                    <Space>
                        <img src={Bird}  alt="Bird the control ambiental" />
                        <br/>
                        <img src={Nissan} alt="Bird the control ambiental" />
                    </Space>
                </h1>
                <div className="sign-in__content-tabs">
                    <Tabs type="card">
                        <TabPane tab={<span>Entrar</span>} key={"1"}>
                            Componente LoginForm
                        </TabPane>
                        <TabPane tab={<span>Nuevo usuario</span>} key={"2"} >
                            <RegisterForm/>
                        </TabPane>
                    </Tabs>
                </div>
            </Content>
        </Layout>
    );
}