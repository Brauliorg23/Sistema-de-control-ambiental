import React, {useState, useEffect} from "react";
import {getAccessTokenApi} from "../../../api/auth";
import { getUbicationsActiveApi } from "../../../api/ubication";
import ListUbications from "../../../components/Admin/Ubications/ListUbications/ListUbications";

import "./Ubications.scss";

export default function Ubications(){
    const [ubicationsActive, setUbicationsActive] = useState([]);
    const [ubicationsInactive, setUbicationsInactive] = useState([]);
    const token = getAccessTokenApi();
    const [reloadUbications, setReloadUbications] = useState(false);    
    
    useEffect(() =>{
        getUbicationsActiveApi(token, true).then(response => {
            setUbicationsActive(response.ubications);
        });
        getUbicationsActiveApi(token, false).then(response => {            
            setUbicationsInactive(response.ubications);
        });
        setReloadUbications(false);
    }, [token, reloadUbications]);

    return (
        <div className="users">
            <ListUbications ubicationsActive={ubicationsActive} ubicationsInactive={ubicationsInactive} setReloadUbications={setReloadUbications} />
        </div>
    );
}