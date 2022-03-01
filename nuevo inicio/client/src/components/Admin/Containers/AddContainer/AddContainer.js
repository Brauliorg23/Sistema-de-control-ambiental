import React, { useState } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import {
  emailValidation,
} from "../../../../utils/formValidation";
import { addContainerApi } from "../../../../api/containers";
import { getAccessTokenApi } from "../../../../api/auth";

import "./AddContainer.scss";

export default function AddContainers(props) {
  const { setIsVisibleModal, setReloadContainers } = props;
  const [container, setContainer] = useState({
    title: "",
    description : "",
    code: "",
    privacyPolicy: false
  });

  const [formValid, setFormValid] = useState({
    title: false,
    description : false,
    code: false,
    privacyPolicy: false
  });

  const changeForm = e => {
    if (e.target.name === "privacyPolicy") {
      setContainer({
        ...container,
        [e.target.name]: e.target.checked
      });
    } else {      
      setContainer({
        ...container,
        [e.target.name]: e.target.value
      });           
    }
  };

  const inputValidation = e => {
    const { type, name1 } = e.target;

    if (type === "title" || type === "description" || type === "code") {
      setFormValid({ ...formValid, [name1]: emailValidation(e.target) });
    }
    if (type === "checkbox") {
      setFormValid({ ...formValid, [name1]: e.target.checked });
    }
  };

  const register = async e => {
    e.preventDefault();
    const titleVal = container.title;
    const descriptionVal =container.description;
    const codeVal = container.code;
    const privacyPolicyVal = container.privacyPolicy;
    if ( !titleVal || !descriptionVal || !privacyPolicyVal || !codeVal) {
      notification["error"]({
        message: "Todos los campos son obligatorios"
      });
    } else {
        const accesToken = getAccessTokenApi();
        addContainerApi(accesToken, container).then( result => {
            console.log(result);
            notification["success"]({
                message: result.message
              });
              setIsVisibleModal(false);
              setReloadContainers(true);
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

    setContainer({
      title: "",
      description : "",
      code: "",
      privacyPolicy: false
    });

    setFormValid({
      title: false,
      description : false,
      code: false,
      privacyPolicy: false
    });
  };

  return (
    <Form className="register-form" onSubmitCapture={register} onChange={changeForm}>
      <Form.Item>
          <Input
            type="text"
            name="code"
            placeholder="Identificador"
            className="register-form__input"
            value={container.code}
            onChange={inputValidation}
          />
      </Form.Item>
      <Form.Item>
          <Input
            type="text"
            name="title"
            placeholder="Nombre"
            className="register-form__input"
            value={container.title}
            onChange={inputValidation}
          />
      </Form.Item>
      <Form.Item>
          <Input
            type="text"
            name="description"
            placeholder="Descripcion"
            className="register-form__input"
            value={container.description}
            onChange={inputValidation}
          />
      </Form.Item>      
      <Form.Item>
        <Checkbox
          name="privacyPolicy"
          onChange={inputValidation}
          checked={container.privacyPolicy}
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