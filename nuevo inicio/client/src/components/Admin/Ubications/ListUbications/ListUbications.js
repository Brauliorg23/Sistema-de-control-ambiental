import React, {useState, useEffect} from 'react';
import {Switch, List, Card, Divider , Avatar, Button, Modal as ModalAntd, notification } from 'antd';
import { EditOutlined , PoweroffOutlined, DeleteOutlined,   } from "@ant-design/icons";
import Modal from '../../../Modal/Modal';
import RegisterForm from "../../RegisterForm/RegisterForm"
import { activateUbicationApi, deleteUbicationApi} from '../../../../api/ubication';
import {getAccessTokenApi} from "../../../../api/auth";
import EditUbicationForm from "../EditUbicationForm/EditUbicationForm";
import "./ListUbications.scss";

const { confirm } = ModalAntd;

export default function ListUbications(props) {
    const {ubications, setReloadUbications} = props;   
    console.log(ubications); 
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    

    function addUbication (){
        setIsVisibleModal(true);
        setModalTitle(`Agregar un nuevo usuario`);
        setModalContent(<RegisterForm setIsVisibleModal={setIsVisibleModal} setReloadUbications={setReloadUbications}/>)
    }
    return(
        <div className='list-ubications'>
            <div className='list-ubications__switch' >                                    
                    <Button 
                        type='primary'
                        onClick={() => addUbication()}
                    >
                        Agregar ubicasion
                    </Button>
            </div>
            <Ubications 
                ubications={ubications} 
                setIsVisibleModal={setIsVisibleModal}
                setModalTitle={setModalTitle}  
                setModalContent={setModalContent}  
                setReloadUbications={setReloadUbications}
            />             
            
            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>            
        </div>
    );
}



function Ubications(props){
    const {
        ubications,
        setIsVisibleModal,
        setModalTitle,
        setModalContent,
        setReloadUbications
    } = props;

    const editUbication = ubication => {
        setIsVisibleModal(true);
        setModalTitle(`Editar ${ubication.name ? ubication.name : "..."} ${ubication.lastname ? ubication.lastname : "..."}`);
        setModalContent(<EditUbicationForm ubication={ubication} setIsVisibleModal={setIsVisibleModal} setReloadUbications={setReloadUbications} />)
    }
    

    return (
        <List
            className='ubications-active'
            itemLayout='horizontal'
            dataSource={ubications}
            grid={{ gutter: 16, column: 4 }}
            renderItem={ubication => <Ubication ubication={ubication} editUbication={editUbication} setReloadUbications={setReloadUbications} />}
        />
                    
    );
}

function Ubication(props){
    const {ubication, editUbication, setReloadUbications} = props;
    const { Meta } = Card;



    const desactivateUbication = () => {
        const accesToken = getAccessTokenApi();
    
        activateUbicationApi(accesToken, ubication._id, false)
          .then(response => {
            notification["success"]({
              message: response
            });
            setReloadUbications(true);
          })
          .catch(err => {
            notification["error"]({
              message: err
            });
          });
      };

    const showDeleteConfirm = () => {
        const accesToken = getAccessTokenApi();
    
        confirm({
          title: "Eliminando usuario",
          content: `¿Estas seguro que quieres eliminar a ${ubication.email}?`,
          okText: "Eliminar",
          okType: "danger",
          cancelText: "Cancelar",
          onOk() {
            deleteUbicationApi(accesToken, ubication._id)
              .then(response => {
                notification["success"]({
                  message: response
                });
                setReloadUbications(true);
              })
              .catch(err => {
                notification["error"]({
                  message: err
                });
              });
          }
        });
      };
    
    return (
        <List.Item >                    
                <Card 
                    className='Card-list'
                    
                    actions={[
                        <Button
                            type='primary'
                            shape="circle"
                            onClick={() => editUbication(ubication)}
                        >
                            <EditOutlined />
                        </Button>,
                        <Button
                            type='danger'
                            shape="circle"
                            onClick={desactivateUbication}
                        >
                            <PoweroffOutlined />
                        </Button>,
                        <Button
                            type='danger'
                            shape="circle"
                            onClick={showDeleteConfirm}
                        >
                            <DeleteOutlined />
                        </Button>
                    ]}                        
                    
                    title={`
                        ${ubication.name ? ubication.name : "..Hola."}
                        ${ubication.lastname ? ubication.lastname : "..."}
                    `}
                    
                >
                    <Meta
                        className='Card-ubication'                        
                        description={ubication.email}
                    />
                </Card>
            </List.Item>
    );
}
