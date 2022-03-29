import React, {useState, useEffect} from "react";
import { Tabs,  Collapse, Progress, Divider , Button} from 'antd';
import {getAccessTokenApi} from "../../../api/auth";
import {getReportsApi} from "../../../api/reports";
import {getUbicationsApi} from "../../../api/ubication";
import {  DownloadOutlined,} from '@ant-design/icons';
import {getAreasApi} from "../../../api/area";
import ListReports from "../../../components/Admin/Reports/ListReports/ListReports";
import ListReportsGrafic from "../../../components/Admin/Reports/ListReportsGrafic/ListReportsGrafic";
import "./Reports.scss"
import Modal from '../../../components/Modal/Modal';

const { TabPane } = Tabs;
const { Panel } = Collapse;
const ContainerHeight = 933;

export default function Reports(){
    const [reports, setReports] = useState([]);
    const [ubications, setUbicaions] = useState([]);
    const [areas, setAreas] = useState([]);
    const token = getAccessTokenApi();
    const [reloadReports, setReloadReports] = useState(false);     
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    var ubi = "";
    var ar = "";
    var mod = "";
    var are = [];
    let ban = 0;
    var rep = "";

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
    
    const onScroll = e => {
        if (e.target.scrollHeight - e.target.scrollTop === ContainerHeight) {      
        }
      };

    function graficas(are){
        setIsVisibleModal(true);
        setModalTitle(`Informacion en grafica`);
        setModalContent(<ListReportsGrafic are={are} /> )
    }


    return (
        <div className="reports">
            <Tabs  type="card" className="reports-list" >                
                {ubications.map(function(ubication) {  
                    ubi = ubication.title;   
                    console.log(are);        
                    return(                        
                        <TabPane className="reports-list_header"  tab={ubication.title} key={ubication._id} height={ContainerHeight}  >                                                       
                            <div className="boto">
                                <Button type="primary" shape="round" onClick={() => graficas(are)} >Ver estadisticas</Button> 
                                <Divider  type='vertical'/>
                                <Button type="primary" shape="round" icon={<DownloadOutlined />}>Descargar</Button>                             
                            </div>
                            {reports.map(function(report)  {   
                                                                                               
                                if(ban === 0){
                                    if (rep === report.module.area.title) {
                                        ban++;
                                    }else{
                                        rep = report.module.area.title;
                                        ban = 0;
                                    }
                                    
                                    return(
                                        
                                        <Areas
                                            areas={areas}
                                            ubication={ubication}
                                            report={report}
                                            are={are}
                                        />
                                    )
                                }                                
                            })}  
                        </TabPane>                                                                      
                    )                                      
                })}                
            </Tabs>   

            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>          
        </div>
    )
}


const Areas = (props) => {
    const {areas, ubication, report, are} = props;

    return(
        <div>
            {areas.map(function(area){
               if(area.title === report.module.area.title && ubication.title === report.module.ubication.title){
                   if (are.length === 0) {
                       are.push(area.title);
                   }else{
                    for (let index = 0; index < are.length; index++) {
                        const element = are[index];
                        if (are[index] !== area.title) {
                            are.push(area.title);
                        }                       
                    }
                   }  
                   
                       return (
                           <>
                            {are.map(function(a){
                                <>{a}</>
                            })}
                           </>
                       )
                   
                   

               }else{
                   console.log("no funciona nada");
               }
               
            })}
        </div>
    )
}


{/* <>                                                                    
{areas.map(function(area) {   
    if (ubi === report.module.ubication.title) {
        ar = area.title;                                               
        are.push(area.title);
        if (area.title === report.module.area.title && area.title === ar) {
            mod = report.module;
            return(       
                                                                 
                <Collapse className="reports-list_cont"  scroll={{  y: 833 }}>
                <Panel 
                className="reports-list_cont-list"
                header={
                    <>
                        <h1>{area.title}</h1>
                        <Progress type="circle" percent={100} />                                                               
                    </>
                } 
                key={area._id}>
                    <ListReports reports={reports} ubi={ubi} ar={ar} mod={mod} setReloadReports={setReloadReports} />    
                </Panel>
            </Collapse>
             
            )
        } 
    } 
                                                                               
    
})}

</> */}