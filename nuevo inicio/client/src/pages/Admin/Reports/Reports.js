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
    var are = [];
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

    function graficas(are, ubi){
        setIsVisibleModal(true);
        setModalTitle(`Informacion en grafica`);
        setModalContent(<ListReportsGrafic are={are} reports={reports} ubi={ubi} bueno={bueno} malo={malo} total={total} /> )
    }

    console.log(malo);
    console.log(bueno);
    console.log(total);

    return (
        <div className="reports">
            <Tabs  type="card" className="reports-list" >                
                {ubications.map(function(ubication) {             
                    return(
                        <TabPane className="reports-list_header"  tab={ubication.title} key={ubication._id} height={ContainerHeight} >
                            <div className="boto">
                                <Button type="primary" shape="round" onClick={() => graficas(are, ubi)} >Ver estadisticas</Button> 
                                <Divider  type='vertical'/>
                                <Button type="primary" shape="round" icon={<DownloadOutlined />}>Descargar</Button>                             
                            </div>
                            {modules.map(function (module){
                                ar = module.area.title;
                                var por = 0;
                                if(ubication.title === module.ubication.title){
                                   
                                    

                                   ubi = ubication.title;
                                    return(
                                        <Areas
                                            reports={reports}
                                            module={module}
                                            are={are}
                                            ubication={ubication}
                                            ar={ar}
                                            por={por}
                                            setReloadReports={setReloadReports}
                                            setBueno={setBueno}
                                            malo={malo}
                                            setTotal={setTotal}
                                        />
                                    )
                                }else{
                                    if(are.length >0){
                                        are.clear();                                    
                                    }
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
    const {module, ubication, reports,  ar, are, setBueno, malo, setTotal, setReloadReports} = props;
    
    var ban = false;
    if(are.length === 0){
        are.push(module.title);
       }else{
           if(ubication.title === module.ubication.title){
                for (let index = 0; index < are.length; index++) {
                    if(are[index] !== module.title){
                        console.log("si puede entrar");
                        ban = true;
                        if(ban === true ){
                            are.push(module.title);
                            ban = false;
                        }
                    }
                } 
           }else{
               are.clear();
            }                  
       }
    return(
        
        <Collapse>
            <Panel
                header={
                    <>
                        <h1>{module.title}</h1>
                        <Progress type="circle" percent={100} />                                                               
                    </>
                } 
                key={1}>
                    <ListReports reports={reports} setBueno={setBueno} malo={malo} setTotal={setTotal} ubi={ubication.title} ar={ar} mod={module} setReloadReports={setReloadReports} />
                </Panel>
        </Collapse>
                   
    )
}

