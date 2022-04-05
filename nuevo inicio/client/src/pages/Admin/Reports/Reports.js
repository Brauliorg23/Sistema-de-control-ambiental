import React, {useState, useEffect} from "react";
import { Tabs,  Collapse, Progress, Divider , Button} from 'antd';
import {getAccessTokenApi} from "../../../api/auth";
import {getReportsApi} from "../../../api/reports";
import {getUbicationsApi} from "../../../api/ubication";
import {getModulesApi} from "../../../api/modules";
import {  DownloadOutlined,} from '@ant-design/icons';
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
    const [modules, setModules] = useState([]);
    const token = getAccessTokenApi();
    const [reloadReports, setReloadReports] = useState(false);     
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [bueno, setBueno] = useState("");
    var malo = 0;
    const [total, setTotal] = useState("");
    const [modalContent, setModalContent] = useState(null);
    var ar = "";
    var ubi = "";
    useEffect(() => {
        getReportsApi(token).then(response => {       
            setReports(response);
        });
        getUbicationsApi(token).then(response => {
            setUbicaions(response.ubication);
        })
        getModulesApi(token, true).then(response => {
            setModules(response);
        });
        getModulesApi(token, false).then(response => {
            setModules(response);
        });
        setReloadReports(false);
    }, [token, reloadReports]);
    
    const onScroll = e => {
        if (e.target.scrollHeight - e.target.scrollTop === ContainerHeight) {      
        }
      };

    function graficas(are, ubi, porM){
        setIsVisibleModal(true);
        setModalTitle(`Informacion en grafica`);
        setModalContent(<ListReportsGrafic are={are}  porM={porM} ubi={ubi} /> )
    }
    

    return (
        <div className="reports">
            <Tabs  type="card" className="reports-list" >                
                {ubications.map(function(ubication) {   
                    
                    var are = [];
                    var porM = [];  
                    let i = 0;      
                    return(
                        <TabPane className="reports-list_header"  tab={ubication.title} key={ubication._id} height={ContainerHeight} >
                            <div className="boto">
                                <Button type="primary" shape="round" onClick={() => graficas(are, ubi, porM)} >Ver estadisticas</Button> 
                                <Divider  type='vertical'/>
                                <Button type="primary" shape="round" icon={<DownloadOutlined />}>Descargar</Button>                             
                            </div>
                            {modules.map(function (module){
                                ar = module.area.title;
                                ubi = ubication.title;
                                
                                if(ubication.title === module.ubication.title){ 
                                    if(are.length === 0){
                                        are.push(module.title);
                                       }else{
                                           if(are[i] !== module.title){
                                                are.push(module.title);
                                                i++;
                                           }
                                
                                                              
                                       } 
                                    return(
                                        <Areas
                                            reports={reports}
                                            module={module}
                                            porM={porM}
                                            ubication={ubication}
                                            ar={ar}
                                            setReloadReports={setReloadReports}
                                            setBueno={setBueno}
                                            malo={malo}
                                            setTotal={setTotal}
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
    const {module, ubication, reports,  ar,  setBueno, malo, setTotal, setReloadReports, porM} = props;
    
    let por = 0;
    let mal = 0;
    let bien =0;
    
    
    return(
        
        <Collapse>
            <Panel
                header={
                    <>
                        <h1>{module.title}</h1>
                        {reports.map(function (report) {
                        
                        if (report.module.title === module.title) {
                        if(report.conten1 === "Mal"){
                            mal++;
                        }else{
                            bien++;
                        }
                        if(report.conten2 === "Mal"){
                            mal++;
                        }else{
                            bien++;
                        }
                        if(report.conten3 === "Mal"){
                            mal++;
                        }else{
                            bien++;
                        }
                        if(report.conten4 === "Mal"){
                            mal++;
                        }else{
                            bien++;
                        }
                        if(report.conten5 === "Mal"){
                            mal++;
                        }else{
                            bien++;
                        }
                        if(report.conten6 === "Mal"){
                            mal++;
                        }else{
                            bien++;
                        }
                        if(report.conten7 === "Mal"){
                            mal++;
                        }else{
                            bien++;
                        }
                        if(report.conten8 === "Mal"){
                            mal++;
                        }else{
                            bien++;
                        }
                        if(report.conten9 === "Mal"){
                            mal++;
                        }else{
                            bien++;
                        }
                        if(report.conten10 === "Mal"){
                            mal++;
                        }else{
                            bien++;
                        }
                        }

                        
                        por = (bien/(bien+mal))*100;
                    })}
                                <Progress type="circle" percent={por} /> 
                                {porM.push(module.title, por)}                                                     
                    </>
                } 
                key={1}>
                    <ListReports reports={reports} setBueno={setBueno} malo={malo} setTotal={setTotal} ubi={ubication.title} ar={ar} mod={module} setReloadReports={setReloadReports} />
                </Panel>
        </Collapse>
                   
    )
}

