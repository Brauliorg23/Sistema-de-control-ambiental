import React, {useState, useEffect} from 'react';
import {Switch, List, Card, Divider , Button, Modal as ModalAntd, notification } from 'antd';
import { EditOutlined , PoweroffOutlined, DeleteOutlined } from "@ant-design/icons";
import NoAvatar from '../../../../assets/img/jpg/Avatar.jpg';
import Modal from '../../../Modal/Modal';
import EditUserForm from "../EditUserForm/EditUserForm";
import RegisterForm from "../../RegisterForm/RegisterForm"
import VirtualList from 'rc-virtual-list';
import { getAvatarApi, activateUserApi, deleteUserApi} from '../../../../api/user';
import {getAccessTokenApi} from "../../../../api/auth";

import "./ListUsers.scss";

const { confirm } = ModalAntd;
const UserHeight = 733;
export default function ListUsers(props) {
    const {usersActive, usersIniactive, setReloadUsers} = props;    
    const [viewUsersActives, setViewUsersActives] = useState(true);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    

    function addUser (){
        setIsVisibleModal(true);
        setModalTitle(`Agregar un nuevo usuario`);
        setModalContent(<RegisterForm setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers}/>)
    }
    return(
        <div className='list-users' >
            <div className='list-users__switch' >                
                    <Switch
                        defaultChecked
                        checkedChildren="Usuarios Activos" 
                        unCheckedChildren="Usuarios inactivos"
                        onChange={() => setViewUsersActives(!viewUsersActives)}
                    />
                    <Divider  type='vertical'/>
                    <Button 
                        type='primary'
                        onClick={() => addUser()}
                    >
                        Agregar usuario
                    </Button>
            </div>
            {viewUsersActives ? (
            <UsersActive 
                usersActive={usersActive} 
                setIsVisibleModal={setIsVisibleModal}
                setModalTitle={setModalTitle}  
                setModalContent={setModalContent}  
                setReloadUsers={setReloadUsers}
            /> 
            ) : (
             <UsersInactive usersIniactive={usersIniactive} setReloadUsers={setReloadUsers}/>
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



function UsersActive(props){
    const {
        usersActive,
        setIsVisibleModal,
        setModalTitle,
        setModalContent,
        setReloadUsers
    } = props;

    const editUser = user => {
        setIsVisibleModal(true);
        setModalTitle(`Editar ${user.name ? user.name : "..."} ${user.lastname ? user.lastname : "..."}`);
        setModalContent(<EditUserForm user={user} setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers} />)
    }
    
    const onScroll = e => {
      if (e.target.scrollHeight - e.target.scrollTop === UserHeight ) {        
      }
    };

    return (
        <List
            className='users-active'
            itemLayout='horizontal'
            height={UserHeight}
            dataSource={usersActive}
            grid={{ gutter: 16, column: 4 }}
            onScroll={onScroll}
            renderItem={user => <UserActive user={user} editUser={editUser} setReloadUsers={setReloadUsers} />}
        />                   
    );
}

function UserActive(props){
    const {user, editUser, setReloadUsers} = props;
    const [avatar, setAvatar] = useState(null);
    const { Meta } = Card;

    useEffect(() => {
        if(user.avatar){
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            })
        }else {
            setAvatar(null);
        }        
    }, [user])


    const desactivateUser = () => {
        const accesToken = getAccessTokenApi();
    
        activateUserApi(accesToken, user._id, false)
          .then(response => {
            notification["success"]({
              message: response
            });
            setReloadUsers(true);
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
          content: `¿Estas seguro que quieres eliminar a ${user.email}?`,
          okText: "Eliminar",
          okType: "danger",
          cancelText: "Cancelar",
          onOk() {
            deleteUserApi(accesToken, user._id)
              .then(response => {
                notification["success"]({
                  message: response
                });
                setReloadUsers(true);
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
                cover={
                <img
                    alt="example"
                    src={avatar ? avatar : NoAvatar}
                /> 
                                    
                }
                actions={[
                    <PoweroffOutlined key="setting"  onClick={desactivateUser}/>,
                    <EditOutlined key="edit" onClick={() => editUser(user)}/>,
                    <DeleteOutlined key="ellipsis" onClick={showDeleteConfirm}/>,
                ]}
            >
                <Meta
                    className='Card-list__ubication'  
                    title={`
                        ${user.name ? user.name : "..Hola."}
                        ${user.lastname ? user.lastname : "..."}
                    `}
                    description={user.email}
                />
            </Card>
        </List.Item>
    );
}

function UsersInactive(props){
    const {usersIniactive, setReloadUsers} = props;
    const { Meta } = Card;
    return (
        <List
            className='users-active'
            itemLayout='horizontal'
            dataSource={usersIniactive}
            grid={{ gutter: 16, column: 4 }}
            renderItem={user => <UserInactive user={user} setReloadUsers={setReloadUsers}/>}
        />
    );
}

function UserInactive(props){
    const {user, setReloadUsers} = props;

    const [avatar, setAvatar] = useState(null);
    const { Meta } = Card;

    useEffect(() => {
        if(user.avatar){
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            })
        }else {
            setAvatar(null);
        }        
    }, [user])

    const activateUser = () => {
        const accesToken = getAccessTokenApi();
    
        activateUserApi(accesToken, user._id, true)
          .then(response => {
            notification["success"]({
              message: response
            });
            setReloadUsers(true);
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
          content: `¿Estas seguro que quieres eliminar a ${user.email}?`,
          okText: "Eliminar",
          okType: "danger",
          cancelText: "Cancelar",
          onOk() {
            deleteUserApi(accesToken, user._id)
              .then(response => {
                notification["success"]({
                  message: response
                });
                setReloadUsers(true);
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
                cover={
                <img
                    alt="example"
                    src={avatar ? avatar : NoAvatar}
                /> 
                                    
                }
                actions={[
                    <PoweroffOutlined key="setting"  onClick={activateUser}/>,
                    <DeleteOutlined key="ellipsis" onClick={showDeleteConfirm}/>,
                ]}
            >
                <Meta
                    className='Card-list__ubication'  
                    title={`
                        ${user.name ? user.name : "..Hola."}
                        ${user.lastname ? user.lastname : "..."}
                    `}
                    description={user.email}
                />
            </Card>
        </List.Item>
    )
}