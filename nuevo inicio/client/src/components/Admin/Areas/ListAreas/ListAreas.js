import React, {useState,  } from 'react';
import { EditOutlined , PoweroffOutlined, DeleteOutlined } from "@ant-design/icons";
import { List, Avatar, notification,  Button,  Switch, Divider, Modal as ModalAntd, } from 'antd';
import Modal from '../../../Modal/Modal';
import AvatarC from "../../../../assets/img/png/area.png";
import {activateAreaApi, deleteAreaApi} from "../../../../api/area";
import {getAccessTokenApi} from "../../../../api/auth";
import EditAreaFrom from "../EditAreasForm/EditAreasForm";
import AddAreas from "../AddAreas/AddAreas";
import VirtualList from 'rc-virtual-list';
import QRModules from "../../Modules/QRModules/QRModules";

import "./ListAreas.scss";

const { confirm } = ModalAntd;
const AreaHeight = 733;

export default function ListArea(props){
    const {areasActive, areasInactive, setReloadAreas} = props;
    // console.log(areasActive);
    const [viewAreasActives, setViewAreasActives] = useState(true);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    function addArea (){
      setIsVisibleModal(true);
      setModalTitle(`Agreagar una nueva area`);
      setModalContent(<AddAreas setIsVisibleModal={setIsVisibleModal} setReloadAreas={setReloadAreas} />);
    }
    return (
        <div className='list-cont' >
          <div className='list-cont__switch'>
            <Switch
                defaultChecked
                checkedChildren="Ubicasiones Activas" 
                unCheckedChildren="Ubicasiones inactivas"
                onChange={() => setViewAreasActives(!viewAreasActives)}
            />
            <Divider  type='vertical'/>
            <Button 
                type='primary'
                onClick={() => addArea()}
            >
                Agregar area
            </Button>            
          </div>
          {viewAreasActives ? (
            <AreasActive
              areasActive={areasActive}
              setIsVisibleModal={setIsVisibleModal}
              setModalTitle={setModalTitle}
              setModalContent={setModalContent}
              setReloadAreas={setReloadAreas}
            />
          ) : (
            <AreasInactive 
              areasInactive={areasInactive}
              setReloadAreas={setReloadAreas}
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

const AreasActive = (props) => {
  const {
    areasActive,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
    setReloadAreas
} = props;

  const editArea = area => {
    console.log(area);
    setIsVisibleModal(true);
    setModalTitle(`Editar el contenedor ${area.title ? area.title : "..."}`);
    setModalContent(<EditAreaFrom area={area} setIsVisibleModal={setIsVisibleModal} setReloadAreas={setReloadAreas} />)
  }

  

  const onScroll = e => {
    if (e.target.scrollHeight - e.target.scrollTop === AreaHeight) {      
    }
  };

  const QRModule = module =>{
    setIsVisibleModal(true);
    setModalTitle(`Agreagar un nuevo contenedor`);
    setModalContent(<QRModules module={module} setIsVisibleModal={setIsVisibleModal} setReloadAreas={setReloadAreas} />);
  }
  return (
    <List >
      <VirtualList
        data={areasActive}
        height={AreaHeight}
        itemHeight={47}
        itemKey="email"
        onScroll={onScroll}
      >
        {area => (
          <AreaActive 
                  area={area} 
                  editArea={editArea}
                  setReloadAreas={setReloadAreas}
                />
        )}
    </VirtualList>
  </List>
  );
};

function AreaActive(props){
  const {area, editArea, setReloadAreas} = props;

  const desactivateArea = () => {
      const accesToken = getAccessTokenApi();
  
      activateAreaApi(accesToken, area._id, false)
        .then(response => {
          notification["success"]({
            message: response
          });
          setReloadAreas(true);
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
        content: `¿Estas seguro que quieres eliminar el ${area.title}?`,
        okText: "Eliminar",
        okType: "danger",
        cancelText: "Cancelar",
        onOk() {
            deleteAreaApi(accesToken, area._id)
            .then(response => {
              notification["success"]({
                message: response
              });
              setReloadAreas(true);
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
    <List.Item key={area.title}>
      <List.Item.Meta
        avatar={<Avatar src={AvatarC} />}
        title={<a href="https://ant.design">{area.title}</a>}
        description={area.description}
      />
      <Divider  type='vertical'/>            
      <Button 
          type='primary'
          onClick={desactivateArea}
          shape="round"
      >
          <PoweroffOutlined/>
      </Button> 
      <Divider  type='vertical'/>
      <Button 
          type='primary'
          onClick={() => editArea(area)}
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

const AreasInactive = (props) => {
  const {
    areasInactive,
    setReloadAreas
  } = props;

  const onScroll = e => {
    if (e.target.scrollHeight - e.target.scrollTop === AreaHeight) {      
    }
  };

  return (
    <List >
      <VirtualList
        data={areasInactive}
        height={AreaHeight}
        itemHeight={47}
        itemKey="email"
        onScroll={onScroll}
      >
        {area => (
          <AreaInactive
            area={area}
            setReloadAreas={setReloadAreas}
          />
        )}
      </VirtualList>
    </List>
  );
};


function AreaInactive(props){
  const {area, setReloadAreas} = props;

  const desactivateArea = () => {
      const accesToken = getAccessTokenApi();
  
      activateAreaApi(accesToken, area._id, true)
        .then(response => {
          notification["success"]({
            message: response
          });
          setReloadAreas(true);
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
        content: `¿Estas seguro que quieres eliminar el ${area.title}?`,
        okText: "Eliminar",
        okType: "danger",
        cancelText: "Cancelar",
        onOk() {
            deleteAreaApi(accesToken, area._id)
            .then(response => {
              notification["success"]({
                message: response
              });
              setReloadAreas(true);
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
    <List.Item key={area.title}>
      <List.Item.Meta
        avatar={<Avatar src={AvatarC} />}
        title={<a href="https://ant.design">{area.title}</a>}
        description={area.description}
      />
      <Divider  type='vertical'/>            
      <Button 
          type='primary'
          onClick={desactivateArea}
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