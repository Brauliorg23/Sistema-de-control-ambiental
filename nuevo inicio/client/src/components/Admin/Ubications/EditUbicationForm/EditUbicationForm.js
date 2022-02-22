import React, { useState, useEffect, useCallback } from "react";
import {Avatar, Form, Input, Select, Button, Row, Col, notification}from "antd";
import {useDropzone} from "react-dropzone";
import NoAvatar from '../../../../assets/img/jpg/Avatar.jpg';
import { updateUbicationApi , uploadAvatarApi ,getAvatarApi} from "../../../../api/ubication";
import {getAccessTokenApi} from "../../../../api/auth";

import "./EditUbicationForm.scss";

export default function EditUbicationForm(props) {
    const {ubication, setIsVisibleModal, setReloadUbications} = props;
    const [avatar, setAvatar] = useState(null);
    const [ubicationData, setUbicationData] = useState({});

    useEffect(() => {
        setUbicationData({
        name: ubication.title,
        lastname: ubication.description,
        avatar: ubication.avatar
      });
    }, [ubication]);
  
    useEffect(() => {
      if (ubication.avatar) {
        getAvatarApi(ubication.avatar).then(response => {
          setAvatar(response);
        });
      } else {
        setAvatar(null);
      }
    }, [ubication]);

    useEffect(() => {
        if (avatar) {
            setUbicationData({ ...ubicationData, avatar: avatar.file });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [avatar]);

    const updateUbication = e => {
      e.preventDefault();
      const token = getAccessTokenApi();
      let ubicationUpdate = ubicationData;
  
      if (!ubicationUpdate.title || !ubicationUpdate.description ) {
        notification["error"]({
          message: "El nombre, apellidos y email son obligatorios."
        });
        return;
      }
  
      if (typeof ubicationUpdate.avatar === "object") {
        uploadAvatarApi(token, ubicationUpdate.avatar, ubication._id).then(response => {
            ubicationUpdate.avatar = response.avatarName;
          updateUbicationApi(token, ubicationUpdate, ubication._id).then(result => {
            notification["success"]({
              message: result.message
            });
            setIsVisibleModal(false);
            setReloadUbications(true);
          });
        });
      } else {
        updateUbicationApi(token, ubicationUpdate, ubication._id).then(result => {
          notification["success"]({
            message: result.message
          });
          setIsVisibleModal(false);
          setReloadUbications(true);
        });
      }
    };


    return (
        <div className="edit-ubication-form">
        <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
        <EditForm  ubicationData={ubicationData} setUbicationData={setUbicationData} updateUbication={updateUbication}/>
        </div>
    );
}

function UploadAvatar(props){
    const {avatar, setAvatar} = props;
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
      if (avatar) {
        if (avatar.preview) {
          setAvatarUrl(avatar.preview);
        } else {
          setAvatarUrl(avatar);
        }
      } else {
        setAvatarUrl(null);
      }
    }, [avatar]);

    const onDrop = useCallback(
        acceptedFiles => {
           const file = acceptedFiles[0];
           setAvatar({file, preview: URL.createObjectURL(file)});
       },
       [setAvatar]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
      });

    return (
        <div className="upload-avatar" {...getRootProps()}>
            <Input {...getInputProps()} />
            {isDragActive ? (
                <Avatar size={150} src={NoAvatar} />
            ) : (
                <Avatar size={150} src={avatarUrl  ? avatarUrl  : NoAvatar} />
            )}
        </div>
    )
}

function EditForm(props) {
    const {  ubicationData, setUbicationData, updateUbication } = props;    

    return (
      <Form className="form-edit" onSubmitCapture={updateUbication}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item>
              <Input               
                placeholder="Title"
                value={ubicationData.title}
                onChange={e => setUbicationData({ ...ubicationData, title: e.target.value })}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Input                
                placeholder="Description"
                value={ubicationData.description}
                onChange={e =>
                    setUbicationData({ ...ubicationData, description: e.target.value })
                }
              />
            </Form.Item>
          </Col>
        </Row>
    
        <Form.Item>
          <Button type="primary" htmlType="submit" className="buttonModal">
            Actualizar Usuario
          </Button>
        </Form.Item>
      </Form>
    );
  }