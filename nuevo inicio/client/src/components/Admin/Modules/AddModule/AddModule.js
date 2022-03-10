import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, notification, Row, Col, Select} from "antd";
import {
  emailValidation,
} from "../../../../utils/formValidation";
import {
  PlusOutlined
} from '@ant-design/icons';
import { addModuleApi } from "../../../../api/modules";
import {getUbicationsApi} from "../../../../api/ubication";
import {getContainersApi} from "../../../../api/containers";
import {getAreasApi} from "../../../../api/area";
import { getAccessTokenApi } from "../../../../api/auth";

import "./AddModule.scss";

export default function AddModule(props) {
  const { setIsVisibleModal, setReloadModules } = props;
  const [ubications, setUbications] = useState([]);
  const [containers, setContainers] = useState([]);
  const [areas, setAreas] = useState([]);
  const { Option } = Select;
  const token = getAccessTokenApi();
  const [module, setModule] = useState({
    title: "",
    description : "",
    codigo: "",
    condition: "",
    conten1: "",
    conten2: "",
    conten3: "",
    conten4: "",
    conten5: "",
    conten6: "",
    conten7: "",
    conten8: "",
    conten9: "",
    conten10: "",
    ubication: "",
    area: "",
    privacyPolicy: false
    
  });

  const [formValid, setFormValid] = useState({
    title: false,
    description : false,
    codigo: false,
    condition: false,
    conten1: false,
    conten2: false,
    conten3: false,
    conten4: false,
    conten5: false,
    conten6: false,
    conten7: false,
    conten8: false,
    conten9: false,
    conten10: false,
    ubication: false,
    area: false,
    privacyPolicy: false
  });

  const changeForm = e => {
    if (e.target.name === "privacyPolicy") {
        setModule({
        ...module,
        [e.target.name]: e.target.checked
      });
    } else {      
        setModule({
        ...module,
        [e.target.name]: e.target.value
      });           
    }
  };

  const inputValidation = e => {
    const { type, name1 } = e.target;

    if (type === "title" || type === "description" || type === "codigo") {
      setFormValid({ ...formValid, [name1]: emailValidation(e.target) });
    }
    if (type === "checkbox") {
      setFormValid({ ...formValid, [name1]: e.target.checked });
    }
  };

  const register = async e => {
    e.preventDefault();
    const titleVal = module.title;
    const descriptionVal =module.description;
    const codigoVal = module.codigo;
    const conditionVal = module.condition;    
    const ubicationVal = module.ubication;  
    const areaVal = module.ubication;  
    const privacyPolicyVal = module.privacyPolicy;
    
    if ( !titleVal || !descriptionVal || !privacyPolicyVal || !codigoVal || !conditionVal|| !ubicationVal ||!areaVal ) {
      notification["error"]({
        message: "Todos los campos son obligatorios"
      });
    } else {
        const accesToken = getAccessTokenApi();
        addModuleApi(accesToken, module).then( result => {
            notification["success"]({
                message: result.message
              });
              setIsVisibleModal(false);
              setReloadModules(true);
              resetForm();
        })        
    }
};

  const resetForm = () => {
    const inputs = document.getElementsByTagName("input");

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].classList.remove("success");
      inputs[i].classList.remove("error");
    }

    setModule({
      title: "",
      description : "",
      codigo: "",
      condition: "",
      conten1: "",
      conten2: "",
      conten3: "",
      conten4: "",
      conten5: "",
      conten6: "",
      conten7: "",
      conten8: "",
      conten9: "",
      conten10: "",
      ubication: "",
      area: "",
      privacyPolicy: false
    });

    setFormValid({
      title: false,
      description : false,
      codigo: false,
      condition: false,
      conten1: false,
      conten2: false,
      conten3: false,
      conten4: false,
      conten5: false,
      conten6: false,
      conten7: false,
      conten8: false,
      conten9: false,
      conten10: false,
      ubication: false,
      area: false,
      privacyPolicy: false
    });
  };

  useEffect(() => {
    getUbicationsApi(token).then(response => {
      setUbications(response.ubication);
    })
    getContainersApi(token).then(response => {      
      setContainers(response.containerTrash);
    })
    getAreasApi(token).then(response => {
      setAreas(response.area);
    })
  }, [token]);
  
  var mostrar = 0;

  function mostrarmas(e){
    return (
      <Select
          className="selectModal"
          placeholder="Seleccióna el contenedor"
          onChange={e => setModule({ ...module, ubication: e})}
          value={module.ubication}
        >
          {ubications.map(function (ubication) {
            return(
              <Option value={ubication._id}>{ubication.title}</Option>
            )
          })}
      </Select>
    )
  }
  
  return (
    <Form className="register-form" onSubmitCapture={register} onChange={changeForm}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
              <Input
                type="text"
                name="title"
                placeholder="Nombre"
                className="register-form__input"
                value={module.title}
                onChange={inputValidation}
              />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
              <Input
                type="text"
                name="description"
                placeholder="Descripcion"
                className="register-form__input"
                value={module.description}
                onChange={inputValidation}
              />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
              <Input
                type="text"
                name="codigo"
                placeholder="Identificador"
                className="register-form__input"
                value={module.codigo}
                onChange={inputValidation}
              />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Select
            className="selectModal"
            placeholder="Seleccióna la condicion del modulo"
            onChange={e => setModule({ ...module, condition: e})}
            value={module.condition}
          >
            <Option value="true">bien</Option>
            <Option value="false">mal</Option>
          </Select>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Select
              className="selectModal"
              placeholder="Seleccióna el contenedor"
              onChange={e => setModule({ ...module, conten1: e})}
              value={module.conten1}
            >
              <Option value="false">default</Option>
              {containers.map(function (container) {
                return(
                  <Option value={container._id}>{container.title}</Option>
                )
              })}
          </Select>
        </Col>
        <Col span={12}>
        <Select
              className="selectModal"
              placeholder="Seleccióna el contenedor"
              onChange={e => setModule({ ...module, conten2: e})}
              value={module.conten2}
            >
              {containers.map(function (container) {
                return(
                  <Option value={container._id}>{container.title}</Option>
                )
              })}
          </Select>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Select
              className="selectModal"
              placeholder="Seleccióna el contenedor"
              onChange={e => setModule({ ...module, conten3: e})}
              value={module.conten3}
            >
              {containers.map(function (container) {
                return(
                  <Option value={container._id}>{container.title}</Option>
                )
              })}
          </Select>
        </Col>
        <Col span={12}>
        <Select
              className="selectModal"
              placeholder="Seleccióna el contenedor"
              onChange={e => setModule({ ...module, conten4: e})}
              value={module.conten4}
            >
              {containers.map(function (container) {
                return(
                  <Option value={container._id}>{container.title}</Option>
                )
              })}
          </Select>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Select
              className="selectModal"
              placeholder="Seleccióna el contenedor"
              onChange={e => setModule({ ...module, conten5: e})}
              value={module.conten5}
            >
              {containers.map(function (container) {
                return(
                  <Option value={container._id}>{container.title}</Option>
                )
              })}
          </Select>
        </Col>
        <Col span={12}>
        <Select
              className="selectModal"
              placeholder="Seleccióna el contenedor"
              onChange={e => setModule({ ...module, conten6: e})}
              value={module.conten6}
            >
              {containers.map(function (container) {
                return(
                  <Option value={container._id}>{container.title}</Option>
                )
              })}
          </Select>
        </Col>
      </Row>
      
      <Row gutter={24}>
        <Col span={12}>
          <Select
              className="selectModal"
              placeholder="Seleccióna el contenedor"
              onChange={e => setModule({ ...module, conten7: e})}
              value={module.conten7}
            >
              {containers.map(function (container) {
                return(
                  <Option value={container._id}>{container.title}</Option>
                )
              })}
          </Select>
        </Col>
        <Col span={12}>
        <Select
              className="selectModal"
              placeholder="Seleccióna el contenedor"
              onChange={e => setModule({ ...module, conten8: e})}
              value={module.conten8}
            >
              {containers.map(function (container) {
                return(
                  <Option value={container._id}>{container.title}</Option>
                )
              })}
          </Select>
        </Col>
      </Row>
      
      <Row gutter={24}>
        <Col span={12}>
          <Select
              className="selectModal"
              placeholder="Seleccióna el contenedor"
              onChange={e => setModule({ ...module, conten9: e})}
              value={module.conten9}
            >
              {containers.map(function (container) {
                return(
                  <Option value={container._id}>{container.title}</Option>
                )
              })}
          </Select>
        </Col>
        <Col span={12}>
        <Select
              className="selectModal"
              placeholder="Seleccióna el contenedor"
              onChange={e => setModule({ ...module, conten10: e})}
              value={module.conten10}
            >
              {containers.map(function (container) {
                return(
                  <Option value={container._id}>{container.title}</Option>
                )
              })}
          </Select>
        </Col>
      </Row>      
      
      <Row gutter={24}>
        <Col span={12}>
          <Select
              className="selectModal"
              placeholder="Seleccióna el contenedor"
              onChange={e => setModule({ ...module, ubication: e})}
              value={module.ubication}
            >
              {ubications.map(function (ubication) {
                return(
                  <Option value={ubication._id}>{ubication.title}</Option>
                )
              })}
          </Select>
        </Col>   
        <Col span={12}>
          <Select
              className="selectModal"
              placeholder="Seleccióna el contenedor"
              onChange={e => setModule({ ...module, area: e})}
              value={module.area}
            >
              {areas.map(function (area) {
                return(
                  <Option value={area._id}>{area.title}</Option>
                )
              })}
          </Select>
        </Col>         
      </Row>

      <Form.Item>
        <Checkbox
          name="privacyPolicy"
          onChange={inputValidation}
          checked={module.privacyPolicy}
        >
          He leído y acepto la política de privacidad.
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="register-form__button">
          Crear cuenta
        </Button>
      </Form.Item>
    </Form>
  );
}