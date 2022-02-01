import React from "react";
import { Button } from "antd";
import "antd/dist/antd.css";
import Icon, {MenuFoldOutlined, PoweroffOutlined, MenuUnfoldOutlined }  from '@ant-design/icons';
import nissanWhith3 from "../../../assets/img/png/nissanWhith3.png";
import nissan2 from "../../../assets/img/png/nissan2.png";

import "./MenuTop.scss";

export default function MenuTop(props) {
  const {menuCollapsed, setMenuCollapsed} = props;
  
  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img
          className={menuCollapsed ? "menu-top__left-logo2" : "menu-top__left-logo" }
          src={menuCollapsed ? nissan2 : nissanWhith3 }
          alt="Agustin Navarro Galdon"
        />
        <Button type="link" size="large" shape="round"
        onClick={() => setMenuCollapsed(!menuCollapsed)}>
            <Icon className="menu-top__left-icon" component={menuCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined} />
        </Button>
      </div>
      <div className="menu-top__right">
        <Button type="link" >
          <Icon className="menu-top__left-icon" component={PoweroffOutlined}   />
        </Button>
      </div>
    </div>
  );
}