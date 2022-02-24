import React, {useState, useEffect} from "react";
import {getAccessTokenApi} from "../../../api/auth";
import ListModules from "../../../components/Admin/Modules/ListModules/ListModules";

export default function MenuWeb(){

    return (
        <div className="menu-web">
            <ListModules/>
        </div>
    )
}