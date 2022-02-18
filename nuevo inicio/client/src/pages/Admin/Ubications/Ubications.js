import React, {useState, useEffect} from "react";
import {getAccessTokenApi} from "../../../api/auth";
import { getUbicationsApi } from "../../../api/ubication";
import ListUbications from "../../../components/Admin/Ubications/ListUbications/ListUbications";

import "./Ubications.scss";

export default function Ubications(){
    const [ubications, setUbications] = useState([]);
    const token = getAccessTokenApi();
    const [reloadUbications, setReloadUbications] = useState(false);
    console.log(ubications);
    
    useEffect(() =>{
        getUbicationsApi(token).then(respons => {
            console.log(respons.ubication);
            setUbications(respons.ubication);
        });
        setReloadUbications(false);
    }, [token, reloadUbications]);

    return (
        <div className="users">
            <ListUbications ubications={ubications} reloadUbications={setReloadUbications} />
        </div>
    );
}