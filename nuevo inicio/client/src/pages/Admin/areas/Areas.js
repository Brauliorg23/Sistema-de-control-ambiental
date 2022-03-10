import React, {useState, useEffect} from "react";
import {getAccessTokenApi} from "../../../api/auth";
import {getAreasActiveApi} from "../../../api/area";
import ListAreas from "../../../components/Admin/Areas/ListAreas/ListAreas";

import "./Areas.scss";

export default function AreaMenu() {
    const [areasActive, setAreasActive] = useState([]);
    const [areasInactive, setAreasInactive] = useState([]);
    const token = getAccessTokenApi();
    const [reloadAreas, setReloadAreas] = useState(false);

    useEffect(() => {
        getAreasActiveApi(token, true).then(result => {
            setAreasActive(result.areas)
        });
        getAreasActiveApi(token, false).then(result => {
            setAreasInactive(result.areas);
        });
        setReloadAreas(false);
    }, [token, reloadAreas]);

    return (
        <div className="containers">
            <ListAreas areasActive={areasActive} areasInactive={areasInactive} setReloadAreas={setReloadAreas} />
        </div>
    )
}