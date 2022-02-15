import React, {useState, useEffect} from 'react';
import {Switch, List, Card, Divider , Avatar, Button, } from 'antd';
import { EditOutlined , PoweroffOutlined, EllipsisOutlined, DeleteOutlined, SettingOutlined,  } from "@ant-design/icons";
import NoAvatar from '../../../../assets/img/jpg/Avatar.jpg';
import Modal from '../../../Modal/Modal';
import EditUserForm from "../EditUserForm/EditUserForm";
import RegisterForm from "../../RegisterForm/RegisterForm"
import { getAvatarApi } from '../../../../api/user';


import "./ListUsers.scss";

export default function ListUsers(props) {
    const {usersActive, usersIniactive} = props;    
    const [viewUsersActives, setViewUsersActives] = useState(true);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    

    function addUser (){
        setIsVisibleModal(true);
        setModalTitle(`Agregar un nuevo usuario`);
        setModalContent(<RegisterForm  />)
    }
    return(
        <div className='list-users'>
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
            /> 
            ) : (
             <UsersInactive usersIniactive={usersIniactive}/>
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
        setModalContent
    } = props;

    const editUser = user => {
        setIsVisibleModal(true);
        setModalTitle(`Editar ${user.name ? user.name : "..."} ${user.lastname ? user.lastname : "..."}`);
        setModalContent(<EditUserForm user={user} />)
    }
    

    return (
        <List
            className='users-active'
            itemLayout='horizontal'
            dataSource={usersActive}
            grid={{ gutter: 16, column: 4 }}
            renderItem={user => <UserActive user={user} editUser={editUser} />}
        />
                    
    );
}

function UserActive(props){
    const {user, editUser} = props;
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
    
    return (
        <List.Item >                    
                <Card 
                    className='Card-list'
                    
                    actions={[
                        <Button
                            type='primary'
                            shape="circle"
                            onClick={() => editUser(user)}
                        >
                            <EditOutlined />
                        </Button>,
                        <Button
                            type='danger'
                            shape="circle"
                            onClick={() => console.log("desactivar usuario")}
                        >
                            <PoweroffOutlined />
                        </Button>,
                        <Button
                            type='danger'
                            shape="circle"
                            onClick={() => console.log("eliminar usuario")}
                        >
                            <DeleteOutlined />
                        </Button>
                    ]}                        
                    
                    title={`
                        ${user.name ? user.name : "..Hola."}
                        ${user.lastname ? user.lastname : "..."}
                    `}
                    
                >
                    <Meta
                        className='Card-list__user'
                        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
                        description={user.email}
                    />
                </Card>
            </List.Item>
    );
}

function UsersInactive(props){
    const {usersIniactive} = props;
    const { Meta } = Card;
    return (
        <List
            className='users-active'
            itemLayout='horizontal'
            dataSource={usersIniactive}
            grid={{ gutter: 16, column: 4 }}
            renderItem={user => <UserInactive user={user}/>}
        />
    );
}

function UserInactive(props){
    const {user} = props;

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

    return(
        <List.Item >
                    <Card
                        className='Card-list'
                        
                        actions={[                        
                            <Button
                                type='primary'
                                shape="circle"
                                onClick={() => console.log("activar usuario usuario")}
                            >
                                <PoweroffOutlined />
                            </Button>,
                            <Button
                                type='danger'
                                shape="circle"
                                onClick={() => console.log("eliminar usuario")}
                            >
                                <DeleteOutlined />
                            </Button>
                        ]}
                        
                        title={`
                            ${user.name ? user.name : "..."}
                            ${user.lastname ? user.lastname : "..."}
                        `}
                        
                    >
                        <Meta 
                            className='Card-list__user'
                            avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
                            description={user.email}
                        />
                    </Card>
                </List.Item>
    )
}