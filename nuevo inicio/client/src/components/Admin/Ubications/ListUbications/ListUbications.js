import React, {useState, useEffect} from 'react';
import {Switch, List, Card, Divider , Button, Modal as ModalAntd, notification } from 'antd';
import { EditOutlined , PoweroffOutlined, DeleteOutlined } from "@ant-design/icons";
import Modal from '../../../Modal/Modal';
import NoAvatar from '../../../../assets/img/jpg/Avatar2.jpg';
import EditUbicationForm from "../EditUbicationForm/EditUbicationForm";
import AddUbication from "../AddUbication/AddUbication"
import { getAvatarApi, activateUbicationApi, deleteUbicationApi} from '../../../../api/ubication';
import {getAccessTokenApi} from "../../../../api/auth";

import "./ListUbications.scss";

const { confirm } = ModalAntd;

export default function ListUbications(props) {
    const {ubicationsActive, ubicationsInactive, setReloadUbications} = props;    
    const [viewUbicationsActives, setViewUbicationsActives] = useState(true);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    

    function addUbication (){
        setIsVisibleModal(true);
        setModalTitle(`Agregar un nuevo usuario`);
        setModalContent(<AddUbication setIsVisibleModal={setIsVisibleModal} setReloadUbications={setReloadUbications}/>)
    }
    return(
        <div className='list-ubications'>
            <div className='list-ubications__switch' >                
                    <Switch
                        defaultChecked
                        checkedChildren="Ubicasiones Activas" 
                        unCheckedChildren="Ubicasiones inactivas"
                        onChange={() => setViewUbicationsActives(!viewUbicationsActives)}
                    />
                    <Divider  type='vertical'/>
                    <Button 
                        type='primary'
                        onClick={() => addUbication()}
                    >
                        Agregar usuario
                    </Button>
            </div>
            {viewUbicationsActives ? (
            <UbicationsActive 
                ubicationsActive={ubicationsActive} 
                setIsVisibleModal={setIsVisibleModal}
                setModalTitle={setModalTitle}  
                setModalContent={setModalContent}  
                setReloadUbications={setReloadUbications}
            /> 
            ) : (
             <UbicationsInactive ubicationsIniactive={ubicationsInactive} setReloadUbications={setReloadUbications}/>
            )}
            
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



function UbicationsActive(props){
    const {
        ubicationsActive,
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
            dataSource={ubicationsActive}
            grid={{ gutter: 16, column: 4 }}
            renderItem={ubication => <UbicationActive ubication={ubication} editUbication={editUbication} setReloadUbications={setReloadUbications} />}
        />
                    
    );
}

function UbicationActive(props){
    const {ubication, editUbication, setReloadUbications} = props;
    const [avatar, setAvatar] = useState(null);
    const { Meta } = Card;

    useEffect(() => {
        if(ubication.avatar){
            getAvatarApi(ubication.avatar).then(response => {
                setAvatar(response);
            })
        }else {
            setAvatar(null);
        }        
    }, [ubication])

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
          content: `¿Estas seguro que quieres eliminar el ${ubication.title}?`,
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
                style={{ width: 200 }}
                cover={
                <img
                    alt="example"
                    src={avatar ? avatar : NoAvatar}
                />
                }
                actions={[
                    <PoweroffOutlined key="setting" onClick={desactivateUbication}/>,
                    <EditOutlined key="edit" onClick={() => editUbication(ubication)}/>,
                    <DeleteOutlined key="ellipsis" onClick={showDeleteConfirm}/>,
                ]}
            >
                <Meta
                    className='Card-list__ubication'  
                    title={`${ubication.title ? ubication.title : "..Hola."}`}
                    description={ubication.description}
                />
            </Card>
        </List.Item>
    );
}

function UbicationsInactive(props){
    const {ubicationsIniactive, setReloadUbications} = props;
    return (
        <List
            className='ubications-active'
            itemLayout='horizontal'
            dataSource={ubicationsIniactive}
            grid={{ gutter: 16, column: 4 }}
            renderItem={ubication => <UbicationInactive ubication={ubication} setReloadUbications={setReloadUbications}/>}
        />
    );
}

function UbicationInactive(props){
    const {ubication, setReloadUbications} = props;
    const [avatar, setAvatar] = useState(null);
    const { Meta } = Card;

    useEffect(() => {
        if(ubication.avatar){
            getAvatarApi(ubication.avatar).then(response => {
                setAvatar(response);
            })
        }else {
            setAvatar(null);
        }        
    }, [ubication])

    const activateUbication = () => {
        const accesToken = getAccessTokenApi();
    
        activateUbicationApi(accesToken, ubication._id, true)
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
          content: `¿Estas seguro que quieres eliminar a ${ubication.title}?`,
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

    return(
        <List.Item >                    

                    <Card
                        className='Card-list'
                        style={{ width: 200 }}
                        cover={
                        <img
                            alt="example"
                            src={avatar ? avatar : NoAvatar}
                        />
                        }
                        actions={[
                            <PoweroffOutlined key="setting" onClick={activateUbication}/>,
                            <DeleteOutlined key="ellipsis" onClick={showDeleteConfirm}/>,
                        ]}
                    >
                        <Meta
                            className='Card-list__ubication'  
                            title={`${ubication.title ? ubication.title : "..Hola."}`}
                            description={ubication.description}
                        />
                    </Card>
                </List.Item>
    )
}