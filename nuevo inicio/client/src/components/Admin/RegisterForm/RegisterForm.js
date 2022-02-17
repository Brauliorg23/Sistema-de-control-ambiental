import React, { useState } from "react";
import { Form, Input, Button, Checkbox, notification, Select } from "antd";
import {
  emailValidation,
  minLengthValidation
} from "../../../utils/formValidation";
import { signUpApi } from "../../../api/user";
import { getAccessTokenApi } from "../../../api/auth";

import "./RegisterForm.scss";

export default function RegisterForm(props) {
  const { setIsVisibleModal, setReloadUsers } = props;
  const [inputs, setInputs] = useState({
    name: "",
    lastname : "",
    role: "",
    email: "",
    password: "",
    repeatPassword: "",
    privacyPolicy: false
  });
  const { Option } = Select;

  const [formValid, setFormValid] = useState({
    name: false,
    lastname : false,
    role: false,
    email: false,
    password: false,
    repeatPassword: false,
    privacyPolicy: false
  });

  const changeForm = e => {
    console.log(e.target.name);
    if (e.target.name === "privacyPolicy") {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.checked
      });
    } else {      
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value
      });           
    }
  };

  const inputValidation = e => {
    const { type, name1 } = e.target;

    if (type === "email" || type === "name" || type === "lastname") {
      setFormValid({ ...formValid, [name1]: emailValidation(e.target) });
    }
    if (type === "password") {
      setFormValid({ ...formValid, [name1]: minLengthValidation(e.target, 6) });
    }
    if (type === "checkbox") {
      setFormValid({ ...formValid, [name1]: e.target.checked });
    }
    if (type === "role") {
      setFormValid({ ...formValid, [name1]: e.target });
      
    }
  };

  const register = async e => {
    e.preventDefault();
    const nameVal = inputs.name;
    const lastnameVal =inputs.lastname;
    const roleVal = inputs.role;
    const emailVal = inputs.email;
    const passwordVal = inputs.password;
    const repeatPasswordVal = inputs.repeatPassword;
    const privacyPolicyVal = inputs.privacyPolicy;
    if ( !nameVal || !lastnameVal || !roleVal || !emailVal || !passwordVal || !repeatPasswordVal || !privacyPolicyVal) {
      notification["error"]({
        message: "Todos los campos son obligatorios"
      });
    } else {
      if (passwordVal !== repeatPasswordVal) {
        notification["error"]({
          message: "Las contraseñas tienen que ser iguales."
        });
      } else {
        const accesToken = getAccessTokenApi();
        const result = await signUpApi(accesToken, inputs);
        if (!result.ok) {
          notification["error"]({
            message: result.message
          });
          resetForm();
        } else {
          notification["success"]({
            message: result.message
          });
          setIsVisibleModal(false);
          setReloadUsers(true);
          resetForm();
        }
      }
    }
  };

  const resetForm = () => {
    const inputs = document.getElementsByTagName("input");

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].classList.remove("success");
      inputs[i].classList.remove("error");
    }

    setInputs({
      name: "",
      lastname : "",
      role: false,
      email: "",
      password: "",
      repeatPassword: "",
      privacyPolicy: false
    });

    setFormValid({
      name: false,
      lastname : false,
      role: false,
      email: false,
      password: false,
      repeatPassword: false,
      privacyPolicy: false
    });
  };

  return (
    <Form className="register-form" onSubmitCapture={register} onChange={changeForm}>
      <Form.Item>
          <Input
            type="text"
            name="name"
            placeholder="Nombre"
            className="register-form__input"
            value={inputs.name}
            onChange={inputValidation}
          />
      </Form.Item>
      <Form.Item>
          <Input
            type="text"
            name="lastname"
            placeholder="Apellido"
            className="register-form__input"
            value={inputs.lastname}
            onChange={inputValidation}
          />
      </Form.Item>
      <Form.Item>
          <Select
            name="role"
            onChange={e => setInputs({ ...inputs, role: e })}
            className="register-form__input"
            placeholder="Selecióna un rol"
            value={inputs.role.value}
          >
            <Option value="admin">Administrador</Option>
            <Option value="editor">Editor</Option>
            <Option value="reviwer">Revisor</Option>
          </Select>          
      </Form.Item>
      <Form.Item>
        <Input
          type="email"
          name="email"
          placeholder="Correo electronico"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.email}
        />
      </Form.Item>
      <Form.Item>
        <Input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.password}
        />
      </Form.Item>
      <Form.Item>
        <Input
          
          type="password"
          name="repeatPassword"
          placeholder="Repetir contraseña"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.repeatPassword}
        />
      </Form.Item>
      <Form.Item>
        <Checkbox
          name="privacyPolicy"
          onChange={inputValidation}
          checked={inputs.privacyPolicy}
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