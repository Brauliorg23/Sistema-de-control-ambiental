import React, { useState } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import {
  emailValidation,
} from "../../../../utils/formValidation";
import { addAreaApi } from "../../../../api/area";
import { getAccessTokenApi } from "../../../../api/auth";

import "./AddAreas.scss";

export default function AddAreas(props) {
  const { setIsVisibleModal, setReloadAreas } = props;
  const [area, setArea] = useState({
    title: "",
    description : "",
    codigo: "",
    privacyPolicy: false
  });

  const [formValid, setFormValid] = useState({
    title: false,
    description : false,
    codigo: false,
    privacyPolicy: false
  });

  const changeForm = e => {
    if (e.target.name === "privacyPolicy") {
        setArea({
        ...area,
        [e.target.name]: e.target.checked
      });
    } else {      
        setArea({
        ...area,
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
    const titleVal = area.title;
    const descriptionVal =area.description;
    const codigoVal = area.codigo;
    const privacyPolicyVal = area.privacyPolicy;
    if ( !titleVal || !descriptionVal || !privacyPolicyVal || !codigoVal) {
      notification["error"]({
        message: "Todos los campos son obligatorios"
      });
    } else {
        const accesToken = getAccessTokenApi();
        addAreaApi(accesToken, area).then( result => {
            console.log(result);
            notification["success"]({
                message: result.message
              });
              setIsVisibleModal(false);
              setReloadAreas(true);
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

    setArea({
      title: "",
      description : "",
      codigo: "",
      privacyPolicy: false
    });

    setFormValid({
      title: false,
      description : false,
      codigo: false,
      privacyPolicy: false
    });
  };

  return (
    <Form className="register-form" onSubmitCapture={register} onChange={changeForm}>
      <Form.Item>
          <Input
            type="text"
            name="codigo"
            placeholder="Identificador"
            className="register-form__input"
            value={area.codigo}
            onChange={inputValidation}
          />
      </Form.Item>
      <Form.Item>
          <Input
            type="text"
            name="title"
            placeholder="Nombre"
            className="register-form__input"
            value={area.title}
            onChange={inputValidation}
          />
      </Form.Item>
      <Form.Item>
          <Input
            type="text"
            name="description"
            placeholder="Descripcion"
            className="register-form__input"
            value={area.description}
            onChange={inputValidation}
          />
      </Form.Item>      
      <Form.Item>
        <Checkbox
          name="privacyPolicy"
          onChange={inputValidation}
          checked={area.privacyPolicy}
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