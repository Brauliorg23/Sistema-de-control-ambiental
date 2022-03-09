import React, {useState, useEffect} from "react";
import { Tabs } from 'antd';
import {getAccessTokenApi} from "../../../api/auth";
import {getReportsApi} from "../../../api/reports";
import {getUbicationsApi} from "../../../api/ubication";
import ListReports from "../../../components/Admin/Reports/ListReports/ListReports"

import "./Reports.scss"

const { TabPane } = Tabs;



export default function MenuWeb(){
    const [reports, setReports] = useState([]);
    const [ubications, setUbicaions] = useState([]);
    const token = getAccessTokenApi();
    const [reloadReports, setReloadReports] = useState(false);    

    useEffect(() => {
        getReportsApi(token).then(response => {            
            setReports(response);
        });
        getUbicationsApi(token).then(response => {
            console.log(response.ubication);
            setUbicaions(response.ubication);
        })
        setReloadReports(false);
    }, [token, reloadReports]);

    return (
        <div className="menu-web">
            <Tabs  type="card">
                {ubications.map(function(ubication) {                        
                        return(
                            <TabPane tab={ubication.title} key={ubication._id}>
                                <ListReports reports={reports} setReloadReports={setReloadReports} />
                            </TabPane>
                        )
                                      
                })}                
            </Tabs>            
        </div>
    )
}