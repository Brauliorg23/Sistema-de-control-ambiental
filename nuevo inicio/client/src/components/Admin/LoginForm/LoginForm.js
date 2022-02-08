import React, { useState } from 'react';
import { Form, Input, Button, notification } from "antd";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../utils/constants";
import { signInApi } from "../../../api/user";

import './LoginForm.scss';

export default function LoginForm(){
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const changeForm = e => {
        setInputs({
          ...inputs,
          [e.target.name]: e.target.value
        });
      };

    const login = async e => {
        e.preventDefault();
        const result = await signInApi(inputs);
    
        if (result.message) {
          notification["error"]({
            message: result.message
          });
        } else {
          const { accessToken, refreshToken } = result;
          localStorage.setItem(ACCESS_TOKEN, accessToken);
          localStorage.setItem(REFRESH_TOKEN, refreshToken);
    
          notification["success"]({
            message: "Login correcto."
          });
    
          window.location.href = "/admin";
        }
    
        console.log(result);
    };

    return (
        <Form className="login-form" onChange={changeForm} onSubmitCapture={login}>
        <Form.Item>
          <Input
            
            type="email"
            name="email"
            placeholder="Correo electronico"
            className="login-form__input"
          />
        </Form.Item>
        <Form.Item>
          <Input
            
            type="password"
            name="password"
            placeholder="Contraseña"
            className="login-form__input"
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="Submit" className="login-form__button">
            Entrar
          </Button>
        </Form.Item>
      </Form>
    );
}