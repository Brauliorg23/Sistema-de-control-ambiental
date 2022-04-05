import React, { useState, useEffect, useCallback } from "react";
import {Avatar, Form, Input, Select, Button, Row, Col, notification}from "antd";
import {useDropzone} from "react-dropzone";
import NoAvatar from '../../../../assets/img/jpg/Avatar.jpg';
import { updateModuleApi  } from "../../../../api/modules";
import {getAccessTokenApi} from "../../../../api/auth";

import "./EditModuleForm.scss";

export default function EditModuleForm(props) {
    const {module, setIsVisibleModal, setReloadModules} = props;
    const [avatar, setAvatar] = useState(null);
    const [moduleData, setModuleData] = useState({});

    useEffect(() => {
      setModuleData({
        title: module.title, 
        description: module.description
      });
    }, [module]);
  
    

    useEffect(() => {
        if (avatar) {
          setModuleData({ ...moduleData, avatar: avatar.file });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [avatar]);

    const updateModule = e => {
      e.preventDefault();
      const token = getAccessTokenApi();
      let moduleUpdate = moduleData;
  
      if (!moduleUpdate.title || !moduleUpdate.description ) {
        notification["error"]({
          message: "El nombre, apellidos y email son obligatorios."
        });
        return;
      }
  
     
        updateModuleApi(token, moduleUpdate, module._id).then(result => {
          notification["success"]({
            message: result.message
          });
          setIsVisibleModal(false);
          setReloadModules(true);
        });
    };


    return (
        <div className="edit-ubication-form">
        <EditForm  moduleData={moduleData} setModuleData={setModuleData} updateModule={updateModule}/>
        </div>
    );
}


function EditForm(props) {
    const {  moduleData, setModuleData, updateModule } = props;    
    
    return (
      <Form className="form-edit" onSubmitCapture={updateModule}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item>
              <Input               
                placeholder="Title"
                value={moduleData.title}
                onChange={e => setModuleData({ ...moduleData, title: e.target.value })}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Input                
                placeholder="Description"
                value={moduleData.description}
                onChange={e =>
                  setModuleData({ ...moduleData, description: e.target.value })
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