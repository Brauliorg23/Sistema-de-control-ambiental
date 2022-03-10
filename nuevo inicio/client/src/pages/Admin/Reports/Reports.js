import React, {useState, useEffect} from "react";
import { Tabs, Collapse } from 'antd';
import {getAccessTokenApi} from "../../../api/auth";
import {getReportsApi} from "../../../api/reports";
import {getUbicationsApi} from "../../../api/ubication";
import {getAreasApi} from "../../../api/area";
import ListReports from "../../../components/Admin/Reports/ListReports/ListReports"

import "./Reports.scss"

const { TabPane } = Tabs;
const { Panel } = Collapse;


export default function MenuWeb(){
    const [reports, setReports] = useState([]);
    const [ubications, setUbicaions] = useState([]);
    const [areas, setAreas] = useState([]);
    const token = getAccessTokenApi();
    const [reloadReports, setReloadReports] = useState(false);     

    useEffect(() => {
        getReportsApi(token).then(response => {     
            console.log(response);       
            setReports(response);
        });
        getUbicationsApi(token).then(response => {
            console.log(response.ubication);
            setUbicaions(response.ubication);
        })
        getAreasApi(token).then(response =>{
            console.log(response);
            setAreas(response.area);
        })
        setReloadReports(false);
    }, [token, reloadReports]);

    return (
        <div className="menu-web">
            <Tabs  type="card">
                
                {ubications.map(function(ubication) {  
                                       
                        return(
                            <TabPane tab={ubication.title} key={ubication._id}>
                                <>
                                <Collapse>
                                    {areas.map(function(area){                                                                                
                                        return(
                                            // <Panel header={area.title} key={area._id}>
                                            //     <ListReports reports={reports} setReloadReports={setReloadReports} />    
                                            // </Panel>
                                            <h1>{area.description}{ubication.title}</h1>
                                        )
                                    })}
                                </Collapse>
                                </>
                            </TabPane>                            
                        )
                                      
                })}                
            </Tabs>            
        </div>
    )
}