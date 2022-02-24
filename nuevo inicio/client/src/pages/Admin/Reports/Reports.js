import React, {useState, useEffect} from "react";
import {getAccessTokenApi} from "../../../api/auth";

import ListReports from "../../../components/Admin/Reports/ListReports/ListReports"

import "./Reports.scss"

export default function MenuWeb(){

    return (
        <div className="menu-web">
            <ListReports/>
        </div>
    )
}