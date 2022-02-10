import React, {useState} from 'react';
import {Switch, List, Avatar, Button, } from 'antd';
import { EditOutlined , PoweroffOutlined, DeleteOutlined,  } from "@ant-design/icons";
import NoAvatar from '../../../../assets/img/jpg/Avatar.jpg';
import Modal from '../../../Modal/Modal';
import EditUserForm from "../EditUserForm/EditUserForm";
import "./ListUsers.scss";

export default function ListUsers(props) {
    const {usersActive, usersIniactive} = props;    
    const [viewUsersActives, setViewUsersActives] = useState(true);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    return(
        <div className='list-users'>
            <div className='list-users__switch'>
                <Switch
                    defaultChecked
                    onChange={() => setViewUsersActives(!viewUsersActives)}
                />
                <span>
                    {viewUsersActives ? "Usuarios Activos" : "Usuarios inactivos"}
                </span>
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
    const edidUser = user => {
        setIsVisibleModal(true);
        setModalTitle(`Editar ${user.name ? user.name : "..."} ${user.lastname ? user.lastname : "..."}`);
        setModalContent(<EditUserForm user={user} />)
    }
    return (
        <List
            className='users-active'
            itemLayout='horizontal'
            dataSource={usersActive}
            renderItem={user => (
                <List.Item 
                    actions={[
                        <Button
                            type='primary'
                            shape="circle"
                            onClick={() => edidUser(user)}
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
                >
                    <List.Item.Meta
                        avatar={<Avatar src={user.avatar ? user.avatar : NoAvatar} />}
                        title={`
                            ${user.name ? user.name : "..."}
                            ${user.lastname ? user.lastname : "..."}
                        `}
                        description={user.email}
                    />
                </List.Item>
            )}
        />
    );
}

function UsersInactive(props){
    const {usersIniactive} = props;

    return (
        <List
            className='users-active'
            itemLayout='horizontal'
            dataSource={usersIniactive}
            renderItem={user => (
                <List.Item 
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
                >
                    <List.Item.Meta
                        avatar={<Avatar src={user.avatar ? user.avatar : NoAvatar} />}
                        title={`
                            ${user.name ? user.name : "..."}
                            ${user.lastname ? user.lastname : "..."}
                        `}
                        description={user.email}
                    />
                </List.Item>
            )}
        />
    );
}