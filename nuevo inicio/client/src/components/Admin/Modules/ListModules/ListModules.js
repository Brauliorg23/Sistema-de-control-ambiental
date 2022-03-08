import React, {useState, useEffect, } from 'react';
import { EditOutlined , PoweroffOutlined, DeleteOutlined } from "@ant-design/icons";
import { List, Avatar, notification, message, Button, Skeleton, Switch, Divider, Modal as ModalAntd, } from 'antd';
import Modal from '../../../Modal/Modal';
import AvatarC from "../../../../assets/img/png/containerAvatar.png";
import {activateModuleApi, deleteModuleApi} from "../../../../api/modules";
import {getAccessTokenApi} from "../../../../api/auth";
import EditModuleForm from "../EditModuleForm/EditModuleForm";
import AddModule from "../AddModule/AddModule";
import VirtualList from 'rc-virtual-list';
import QRModules from "../../Modules/QRModules/QRModules";

import "./ListModules.scss";

const { confirm } = ModalAntd;
const fakeDataUrl =
  'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ModuleHeight = 733;

export default function ListModule(props){
    const {modulesActive, modulesInactive, setReloadModules} = props;
    
    const [viewModulesActives, setViewModulesActives] = useState(true);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    function addModule (){
      setIsVisibleModal(true);
      setModalTitle(`Agreagar un nuevo contenedor`);
      setModalContent(<AddModule setIsVisibleModal={setIsVisibleModal} setReloadModules={setReloadModules} />);
    }
    return (
        <div className='list-cont' >
          <div className='list-cont__switch'>
            <Switch
                defaultChecked
                checkedChildren="Ubicasiones Activas" 
                unCheckedChildren="Ubicasiones inactivas"
                onChange={() => setViewModulesActives(!viewModulesActives)}
            />
            <Divider  type='vertical'/>
            <Button 
                type='primary'
                onClick={() => addModule()}
            >
                Agregar contenedor
            </Button>            
          </div>
          {viewModulesActives ? (
            <ModulesActive
              modulesActive={modulesActive}
              setIsVisibleModal={setIsVisibleModal}
              setModalTitle={setModalTitle}
              setModalContent={setModalContent}
              setReloadModules={setReloadModules}
            />
          ) : (
            <ModulesInactive 
              modulesInactive={modulesInactive}
              setReloadModules={setReloadModules}
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

const ModulesActive = (props) => {
  const {
    modulesActive,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
    setReloadModules
} = props;

  const editModule = module => {
    setIsVisibleModal(true);
    setModalTitle(`Editar el contenedor ${module.title ? module.title : "..."}`);
    setModalContent(<EditModuleForm module={module} setIsVisibleModal={setIsVisibleModal} setReloadModules={setReloadModules} />)
  }

  

  const onScroll = e => {
    if (e.target.scrollHeight - e.target.scrollTop === ModuleHeight) {      
    }
  };

  const QRModule = module =>{
    setIsVisibleModal(true);
    setModalTitle(`Agreagar un nuevo contenedor`);
    setModalContent(<QRModules module={module} setIsVisibleModal={setIsVisibleModal} setReloadModules={setReloadModules} />);
  }
  return (
    <List >
      <VirtualList
        data={modulesActive}
        height={ModuleHeight}
        itemHeight={47}
        itemKey="email"
        onScroll={onScroll}
      >
        {module => (
          <ModuleActive 
                  module={module} 
                  editModule={editModule}
                  setReloadModules={setReloadModules}
                />
        )}
    </VirtualList>
  </List>
  );
};

function ModuleActive(props){
  const {module, editModule, setReloadModules} = props;

  const desactivateModule = () => {
      const accesToken = getAccessTokenApi();
  
      activateModuleApi(accesToken, module._id, false)
        .then(response => {
          notification["success"]({
            message: response
          });
          setReloadModules(true);
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
        content: `¿Estas seguro que quieres eliminar el ${module.title}?`,
        okText: "Eliminar",
        okType: "danger",
        cancelText: "Cancelar",
        onOk() {
          deleteModuleApi(accesToken, module._id)
            .then(response => {
              notification["success"]({
                message: response
              });
              setReloadModules(true);
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
    <List.Item key={module.title}>
      <List.Item.Meta
        avatar={<Avatar src={AvatarC} />}
        title={<a href="https://ant.design">{module.title}</a>}
        description={module.description}
      />
      <Divider  type='vertical'/>            
      <Button 
          type='primary'
          onClick={desactivateModule}
      >
          <PoweroffOutlined/>
      </Button> 
      <Divider  type='vertical'/>
      <Button 
          type='primary'
          onClick={() => editModule(module)}
      >
          <EditOutlined/>
      </Button> 
      <Divider  type='vertical'/>
      <Button 
          type='primary'
          onClick={showDeleteConfirm}
      >
          <DeleteOutlined/>
      </Button> 
      <Divider  type='vertical'/>
    </List.Item>
  );
}

const ModulesInactive = (props) => {
  const {
    modulesInactive,
    setReloadModules
  } = props;

  const onScroll = e => {
    if (e.target.scrollHeight - e.target.scrollTop === ModuleHeight) {      
    }
  };

  return (
    <List >
      <VirtualList
        data={modulesInactive}
        height={ModuleHeight}
        itemHeight={47}
        itemKey="email"
        onScroll={onScroll}
      >
        {module => (
          <ModuleInactive
            module={module}
            setReloadModules={setReloadModules}
          />
        )}
      </VirtualList>
    </List>
  );
};


function ModuleInactive(props){
  const {module, setReloadModules} = props;

  const desactivateModule = () => {
      const accesToken = getAccessTokenApi();
  
      activateModuleApi(accesToken, module._id, true)
        .then(response => {
          notification["success"]({
            message: response
          });
          setReloadModules(true);
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
        content: `¿Estas seguro que quieres eliminar el ${module.title}?`,
        okText: "Eliminar",
        okType: "danger",
        cancelText: "Cancelar",
        onOk() {
          deleteModuleApi(accesToken, module._id)
            .then(response => {
              notification["success"]({
                message: response
              });
              setReloadModules(true);
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
    <List.Item key={module.title}>
      <List.Item.Meta
        avatar={<Avatar src={AvatarC} />}
        title={<a href="https://ant.design">{module.title}</a>}
        description={module.description}
      />
      <Divider  type='vertical'/>            
      <Button 
          type='primary'
          onClick={desactivateModule}
      >
          <PoweroffOutlined/>
      </Button> 
      <Divider  type='vertical'/>
      <Button 
          type='primary'
          onClick={showDeleteConfirm}
      >
          <DeleteOutlined/>
      </Button> 
      <Divider  type='vertical'/>
    </List.Item>
  );
}