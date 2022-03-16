import React, {useState, useEffect} from "react";
import { Tabs,  Collapse, Progress, List, Button} from 'antd';
import {getAccessTokenApi} from "../../../api/auth";
import {getReportsApi} from "../../../api/reports";
import {getUbicationsApi} from "../../../api/ubication";
import VirtualList from 'rc-virtual-list';
import {getAreasApi} from "../../../api/area";
import ListReports from "../../../components/Admin/Reports/ListReports/ListReports";
import "./Reports.scss"

const { TabPane } = Tabs;
const { Panel } = Collapse;
const ContainerHeight = 733;

export default function MenuWeb(){
    const [reports, setReports] = useState([]);
    const [ubications, setUbicaions] = useState([]);
    const [areas, setAreas] = useState([]);
    const token = getAccessTokenApi();
    const [reloadReports, setReloadReports] = useState(false);     

    useEffect(() => {
        getReportsApi(token).then(response => {       
            setReports(response);
        });
        getUbicationsApi(token).then(response => {
            setUbicaions(response.ubication);
        })
        getAreasApi(token).then(response =>{
            setAreas(response.area);
        })
        setReloadReports(false);
    }, [token, reloadReports]);
    var ubi = "";
    var ar = "";
    var mod = "";
    const onScroll = e => {
        if (e.target.scrollHeight - e.target.scrollTop === ContainerHeight) {      
        }
      };
    return (
        <div className="reports">
            <Tabs  type="card" className="reports-list" height={ContainerHeight}>                
                {ubications.map(function(ubication) {  
                    ubi = ubication.title;           
                    return(
                        
                        <TabPane className="reports-list_header"  tab={ubication.title} key={ubication._id} >                           
                            {areas.map(function(area)  {                                                                  
                                return(
                                    <>                                    
                                        {reports.map(function(report) {   
                                            if (ubi === report.module.ubication.title) {
                                                ar = area.title; 
                                                if (ar === report.module.area.title ) {
                                                    mod = report.module;
                                                    return(
                                                        <List >
                                                        <VirtualList data={reports} onScroll={onScroll} itemHeight={47}>
                                                            {report => (
                                                                <Collapse className="reports-list_cont"  >
                                                                <Panel 
                                                                className="reports-list_cont-list"
                                                                header={
                                                                    <>
                                                                        <h1>{area.title}</h1>
                                                                        <Progress type="circle" percent={75} />
                                                                        <Button>Ver estadisticas</Button>
                                                                    </>
                                                                } 
                                                                key={area._id}>
                                                                    <ListReports reports={reports} ubi={ubi} ar={ar} mod={mod} setReloadReports={setReloadReports} />    
                                                                </Panel>
                                                            </Collapse>
                                                            )}
                                                            
                                                        </VirtualList>
                                                        </List>
                                                    )
                                                } 
                                            } 
                                                                                                                       
                                            
                                        })}
                                    
                                    </>
                                )
                                
                            })}  
                        </TabPane>                        
                    )                                      
                })}                
            </Tabs>            
        </div>
    )
}