import React, {useState,  } from 'react';
import { EditOutlined , PoweroffOutlined, DeleteOutlined } from "@ant-design/icons";
import { List, Avatar, notification,  Button,  Switch, Divider, Modal as ModalAntd, } from 'antd';
import Modal from '../../../Modal/Modal';
import AvatarC from "../../../../assets/img/png/containerAvatar.png";
import {activateContainerApi, deleteContainerApi} from "../../../../api/containers";
import {getAccessTokenApi} from "../../../../api/auth";
import EditContainerFrom from "../EditContainerForm/EditContainerForm";
import AddContainer from "../AddContainer/AddContainer";
import VirtualList from 'rc-virtual-list';
import QRModules from "../../Modules/QRModules/QRModules";

import "./ListContainers.scss";

const { confirm } = ModalAntd;
const ContainerHeight = 733;

export default function ListContainer(props){
    const {containersActive, containersInactive, setReloadContainers} = props;
    
    const [viewContainersActives, setViewContainersActives] = useState(true);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    function addContainer (){
      setIsVisibleModal(true);
      setModalTitle(`Agreagar un nuevo contenedor`);
      setModalContent(<AddContainer setIsVisibleModal={setIsVisibleModal} setReloadContainers={setReloadContainers} />);
    }
    return (
        <div className='list-cont' >
          <div className='list-cont__switch'>
            <Switch
                defaultChecked
                checkedChildren="Ubicasiones Activas" 
                unCheckedChildren="Ubicasiones inactivas"
                onChange={() => setViewContainersActives(!viewContainersActives)}
            />
            <Divider  type='vertical'/>
            <Button 
                type='primary'
                onClick={() => addContainer()}
            >
                Agregar contenedor
            </Button>            
          </div>
          {viewContainersActives ? (
            <ContainersActive
              containersActive={containersActive}
              setIsVisibleModal={setIsVisibleModal}
              setModalTitle={setModalTitle}
              setModalContent={setModalContent}
              setReloadContainers={setReloadContainers}
            />
          ) : (
            <ContainersInactive 
              containersInactive={containersInactive}
              setReloadContainers={setReloadContainers}
            />
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

const ContainersActive = (props) => {
  const {
    containersActive,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
    setReloadContainers
  } = props;

  const editContainer = container => {
    setIsVisibleModal(true);
    setModalTitle(`Editar el contenedor ${container.title ? container.title : "..."}`);
    setModalContent(<EditContainerFrom container={container} setIsVisibleModal={setIsVisibleModal} setReloadContainers={setReloadContainers} />)
  }

  

  const onScroll = e => {
    if (e.target.scrollHeight - e.target.scrollTop === ContainerHeight) {      
    }
  };

  const QRModule = module =>{
    setIsVisibleModal(true);
    setModalTitle(`Agreagar un nuevo contenedor`);
    setModalContent(<QRModules module={module} setIsVisibleModal={setIsVisibleModal} setReloadContainers={setReloadContainers} />);
  }
  
  return (
    <List >
      <VirtualList
        data={containersActive}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="email"
        onScroll={onScroll}
      >
        {container => (
          <ContainerActive 
                  container={container} 
                  editContainer={editContainer}
                  setReloadContainers={setReloadContainers}
                />
        )}
    </VirtualList>
  </List>
  );
};

function ContainerActive(props){
  const {container, editContainer, setReloadContainers} = props;

  const desactivateContainer = () => {
      const accesToken = getAccessTokenApi();
  
      activateContainerApi(accesToken, container._id, false)
        .then(response => {
          notification["success"]({
            message: response
          });
          setReloadContainers(true);
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
        content: `¿Estas seguro que quieres eliminar el ${container.title}?`,
        okText: "Eliminar",
        okType: "danger",
        cancelText: "Cancelar",
        onOk() {
          deleteContainerApi(accesToken, container._id)
            .then(response => {
              notification["success"]({
                message: response
              });
              setReloadContainers(true);
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
    <List.Item key={container.title}>
      <List.Item.Meta
        avatar={<Avatar src={AvatarC} />}
        title={<a href="https://ant.design">{container.title}</a>}
        description={container.description}
      />
      <Divider  type='vertical'/>            
      <Button 
          type='primary'
          onClick={desactivateContainer}
          shape="round"
      >
          <PoweroffOutlined/>
      </Button> 
      <Divider  type='vertical'/>
      <Button 
          type='primary'
          onClick={() => editContainer(container)}
          shape="round"
      >
          <EditOutlined/>
      </Button> 
      <Divider  type='vertical'/>
      <Button 
          type='primary'
          onClick={showDeleteConfirm}
          shape="round"
      >
          <DeleteOutlined/>
      </Button> 
      <Divider  type='vertical'/>
    </List.Item>
  );
}

const ContainersInactive = (props) => {
  const {
    containersInactive,
    setReloadContainers
  } = props;

  const onScroll = e => {
    if (e.target.scrollHeight - e.target.scrollTop === ContainerHeight) {      
    }
  };

  return (
    <List >
      <VirtualList
        data={containersInactive}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="email"
        onScroll={onScroll}
      >
        {container => (
          <ContainerInactive
            container={container}
            setReloadContainers={setReloadContainers}
          />
        )}
      </VirtualList>
    </List>
  );
};


function ContainerInactive(props){
  const {container, setReloadContainers} = props;

  const desactivateContainer = () => {
      const accesToken = getAccessTokenApi();
  
      activateContainerApi(accesToken, container._id, true)
        .then(response => {
          notification["success"]({
            message: response
          });
          setReloadContainers(true);
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
        content: `¿Estas seguro que quieres eliminar el ${container.title}?`,
        okText: "Eliminar",
        okType: "danger",
        cancelText: "Cancelar",
        onOk() {
          deleteContainerApi(accesToken, container._id)
            .then(response => {
              notification["success"]({
                message: response
              });
              setReloadContainers(true);
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
    <List.Item key={container.title}>
      <List.Item.Meta
        avatar={<Avatar src={AvatarC} />}
        title={<a href="https://ant.design">{container.title}</a>}
        description={container.description}
      />
      <Divider  type='vertical'/>            
      <Button 
          type='primary'
          onClick={desactivateContainer}
          shape="round"
      >
          <PoweroffOutlined/>
      </Button> 
      <Divider  type='vertical'/>
      <Button 
          type='primary'
          onClick={showDeleteConfirm}
          shape="round"
      >
          <DeleteOutlined/>
      </Button> 
      <Divider  type='vertical'/>
    </List.Item>
  );
}