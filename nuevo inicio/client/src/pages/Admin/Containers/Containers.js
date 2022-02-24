import React, {useState, useEffect} from "react";
import {getAccessTokenApi} from "../../../api/auth";
import ListContainers from "../../../components/Admin/Containers/ListContainers/ListContainers";

export default function MenuWeb(){

    return (
        <div className="menu-web">
            <ListContainers />
        </div>
    )
}