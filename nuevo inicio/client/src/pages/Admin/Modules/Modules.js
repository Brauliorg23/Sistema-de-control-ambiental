import React, {useState, useEffect} from "react";
import {getAccessTokenApi} from "../../../api/auth";
import {getModulesApi} from "../../../api/modules";
import ListModules from "../../../components/Admin/Modules/ListModules/ListModules";

import "./Modules.scss";

export default function MenuWeb(){
    const [modulesActive, setModulesActive] = useState([]);
    const [modulesInactive, setModulesInactive] = useState([]);
    const token = getAccessTokenApi();
    const [reloadModules, setReloadModules] = useState(false);

    useEffect(() => {
        getModulesApi(token, true).then(response => {
            setModulesActive(response);
        });
        getModulesApi(token, false).then(response => {
            setModulesInactive(response);
        });
        setReloadModules(false);
    }, [token, reloadModules]);

    return (
        <div className="menu-web">
            <ListModules modulesActive={modulesActive} modulesInactive={modulesInactive} setReloadModules={setReloadModules} />
        </div>
    )
}