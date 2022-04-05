import React, { useState, useEffect } from "react";
import {Form, Input, Button, Row, Col, notification}from "antd";
import { updateAreaApi } from "../../../../api/area";
import {getAccessTokenApi} from "../../../../api/auth";

import "./EditAreasForm.scss";

export default function EditAreaFrom(props) {
    const {area, setIsVisibleModal, setReloadAreas} = props;
    const [areaData, setAreaData] = useState({});
    console.log(area);
    useEffect(() => {
        setAreaData({
        title: area.title,
        description: area.description,
      });
    }, [area]);

    const updateArea = e => {
      e.preventDefault();
      const token = getAccessTokenApi();
      let areaUpdate = areaData;
  
      if (!areaUpdate.title || !areaUpdate.description ) {
        notification["error"]({
          message: "El nombre, apellidos y email son obligatorios."
        });
        return;
      }
  
      
      updateAreaApi(token, areaUpdate, area._id).then(result => {
        notification["success"]({
          message: result.message
        });
        setIsVisibleModal(false);
        setReloadAreas(true);
      });
      
    };


    return (
        <div className="edit-container-form">        
        <EditForm  areaData={areaData} setAreaData={setAreaData} updateArea={updateArea}/>
        </div>
    );
}

function EditForm(props) {
    const {  areaData, setAreaData, updateArea } = props;    
    return (
      <Form className="form-edit" onSubmitCapture={updateArea}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item>
              <Input               
                placeholder="Title"
                value={areaData.title}
                onChange={e => setAreaData({ ...areaData, title: e.target.value })}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Input                
                placeholder="Description"
                value={areaData.description}
                onChange={e =>
                    setAreaData({ ...areaData, description: e.target.value })
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