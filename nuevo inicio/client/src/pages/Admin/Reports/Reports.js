import React, {useState, useEffect} from "react";
import {getAccessTokenApi} from "../../../api/auth";
import {getModulesApi} from "../../../api/reports"
import ListReports from "../../../components/Admin/Reports/ListReports/ListReports"

import "./Reports.scss"

export default function MenuWeb(){
    const [modules, setModules] = useState([]);
    const token = getAccessTokenApi();
    const [reloadModules, setReloadModules] = useState(false);    

    useEffect(() => {
        getModulesApi(token).then(response => {            
            setModules(response);
        });
        setReloadModules(false);
    }, [token, reloadModules]);

    return (
        <div className="menu-web">
            <ListReports modules={modules} setReloadModules={setReloadModules} />
        </div>
    )
}