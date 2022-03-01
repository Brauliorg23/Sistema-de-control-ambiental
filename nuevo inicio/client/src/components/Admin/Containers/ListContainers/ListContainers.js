import React, {useState, useEffect, } from 'react';
import { EditOutlined , PoweroffOutlined, DeleteOutlined } from "@ant-design/icons";
import { List, Avatar, notification, message, Button, Skeleton, Switch, Divider, Modal as ModalAntd, } from 'antd';
import Modal from '../../../Modal/Modal';
import AvatarC from "../../../../assets/img/png/containerAvatar.png";
import {activateContainerApi, deleteContainerApi} from "../../../../api/containers";
import {getAccessTokenApi} from "../../../../api/auth";
import EditContainerFrom from "../EditContainerForm/EditContainerForm";
import AddContainer from "../AddContainer/AddContainer";
import InfiniteScroll from 'react-infinite-scroll-component';
import VirtualList from 'rc-virtual-list';
import QRModules from "../../Modules/QRModules/QRModules";




import "./ListContainers.scss";

const { confirm } = ModalAntd;
const count = 3;
const fakeDataUrl =
  'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 700;

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
  const [data, setData] = useState([]);

  const appendData = () => {
    fetch(fakeDataUrl)
      .then(res => res.json())
      .then(body => {
        setData(data.concat(body.results));
        message.success(`${body.results.length} more items loaded!`);
      });
  };

  useEffect(() => {
    appendData();
  }, []);

  const onScroll = e => {
    if (e.target.scrollHeight - e.target.scrollTop === ContainerHeight) {
      appendData();
    }
  };

  const QRModule = module =>{
    setIsVisibleModal(true);
    setModalTitle(`Agreagar un nuevo contenedor`);
    setModalContent(<QRModules module={module} setIsVisibleModal={setIsVisibleModal} setReloadContainers={setReloadContainers} />);
  }

  return (
    <List>
      <VirtualList
        data={data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="email"
        onScroll={onScroll}
      >
        {item => (
          <List.Item key={item.email}>
            <List.Item.Meta
              avatar={<Avatar src={item.picture.large} />}
              title={<a href="https://ant.design">{item.name.last}</a>}
              description={item.email}
            />
            <Divider  type='vertical'/>            
            <Button 
                type='primary'
                onClick={() => QRModule(item)}
            >
                <PoweroffOutlined/>
            </Button> 
            <Divider  type='vertical'/>
            <Button 
                type='primary'
                onClick={() => QRModule(item)}
            >
                <EditOutlined/>
            </Button> 
            <Button 
                type='primary'
                onClick={() => QRModule(item)}
            >
                qr
            </Button> 
            <Divider  type='vertical'/>
            <Button 
                type='primary'
                onClick={() => QRModule(item)}
            >
                <DeleteOutlined/>
            </Button> 
            <Divider  type='vertical'/>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};

const ContainersInactive = (props) => {
  const {
    containersInactive,
    setReloadContainers
  } = props;

  const [data, setData] = useState([]);

  const appendData = () => {
    fetch(fakeDataUrl)
      .then(res => res.json())
      .then(body => {
        setData(data.concat(body.results));
        message.success(`${body.results.length} more items loaded!`);
      });
  };

  useEffect(() => {
    appendData();
  }, []);

  const onScroll = e => {
    if (e.target.scrollHeight - e.target.scrollTop === ContainerHeight) {
      appendData();
    }
  };

  const showDeleteConfirm = container => {
    const accesToken = getAccessTokenApi();

    confirm({
      title: "Eliminando usuario",
      content: `¿Estas seguro que quieres eliminar a ?`,
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
    <List >
      <VirtualList
        data={data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="email"
        onScroll={onScroll}
      >
        {item => (
          <List.Item key={item.email}>
            <List.Item.Meta
              avatar={<Avatar src={item.picture.large} />}
              title={<a href="https://ant.design">{item.name.last}</a>}
              description={item.email}
            />
            <Divider  type='vertical'/>            
            <Button 
                type='primary'
                onClick={() => console.log("gisdutdsiu")}
            >
                <PoweroffOutlined/>
            </Button>             
            <Divider  type='vertical'/>
            <Button 
                type='primary'
                onClick={() => showDeleteConfirm(item)}
            >
                <DeleteOutlined/>
            </Button> 
            <Divider  type='vertical'/>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};
