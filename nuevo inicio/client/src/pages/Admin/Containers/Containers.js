import React, {useState, useEffect} from "react";
import {getAccessTokenApi} from "../../../api/auth";
import {getContainersActiveApi} from "../../../api/containers";
import ListContainers from "../../../components/Admin/Containers/ListContainers/ListContainers";

import "./Containers.scss";

export default function MenuWeb(){
    const [containersActive, setContainersActive] = useState([]);
    const [containersInactive, serContainersInactive] = useState([]);
    const token = getAccessTokenApi();
    const [reloadContainers, setReloadContainers] = useState(false);

    useEffect(() => {
        getContainersActiveApi(token, true).then(result => {
            setContainersActive(result.containerTrash);
        });
        getContainersActiveApi(token, false).then(result => {
            serContainersInactive(result.containerTrash);
        });
        setReloadContainers(false);
    }, [token, reloadContainers]);
    
    return (
        <div className="containers">
            <ListContainers containersActive={containersActive} containersInactive={containersInactive} setReloadContainers={setReloadContainers} />
        </div>
    )
}