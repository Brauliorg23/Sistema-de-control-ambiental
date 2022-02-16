import React, { useState } from "react";
import { Form, Input, Button, Checkbox, notification, Row, Col, Select} from "antd";
import { signUpAdminApi } from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";

import "./AddUserForm.scss";

export default function EditUserForm(props) {
    const { setIsVisibleModal, setReloadUsers } = props;
    const [userData, setUserData] = useState({});
    
    const addUser = event => {
        event.preventDefault();
    
        if (
          !userData.name ||
          !userData.lastname ||
          !userData.role ||
          !userData.email ||
          !userData.password ||
          !userData.repeatPassword
        ) {
          notification["error"]({
            message: "Todos los campos son obligatorios."
          });
        } else if (userData.password !== userData.repeatPassword) {
          notification["error"]({
            message: "Las contraseñas tienen que ser iguale."
          });
        } else {
          const accesToken = getAccessTokenApi();
    
          signUpAdminApi(accesToken, userData)
            .then(response => {
              notification["success"]({
                message: response
              });
              setIsVisibleModal(false);
              setReloadUsers(true);
              setUserData({});
            })
            .catch(err => {
              notification["error"]({
                message: err
              });
            });
        }
      };

    return (
        <AddForm
        userData={userData}
        setUserData={setUserData}
        addUser={addUser}
      />
    );
}

function AddForm(props) {
    const { userData, setUserData, addUser } = props;
    const { Option } = Select;

    return (
        <Form className="register-form" onSubmitCapture={addUser} >
            <Row gutter={24}>
                <Col span={12}>
                <Form.Item>
                    <Input
                    placeholder="Nombre"
                    value={userData.name}
                    onChange={e => setUserData({ ...userData, name: e.target.value })}
                    />
                </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item>
                    <Input
                    placeholder="Apellidos"
                    value={userData.lastname}
                    onChange={e =>
                        setUserData({ ...userData, lastname: e.target.value })
                    }
                    />
                </Form.Item>
                </Col>
            </Row>
            
            <Row gutter={24}>
                <Col span={12}>
                <Form.Item>
                    <Input
                    type="email"
                    placeholder="Correlo electronico"
                    value={userData.email}
                    onChange={e =>
                        setUserData({ ...userData, email: e.target.value })
                    }
                    />
                </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item>
                    <Select
                    placeholder="Selecióna un rol"
                    onChange={e => setUserData({ ...userData, role: e })}
                    value={userData.role}
                    >
                    <Option value="admin">Administrador</Option>
                    <Option value="editor">Editor</Option>
                    <Option value="reviwer">Revisor</Option>
                    </Select>
                </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                <Form.Item>
                    <Input
                    type="password"
                    placeholder="Contraseña"
                    value={userData.password}
                    onChange={e =>
                        setUserData({ ...userData, password: e.target.value })
                    }
                    />
                </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item>
                    <Input
                    type="password"
                    placeholder="Repetir contraseña"
                    value={userData.repeatPassword}
                    onChange={e =>
                        setUserData({ ...userData, repeatPassword: e.target.value })
                    }
                    />
                </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button htmlType="submit" className="register-form__button">
                    Crear usuario
                </Button>
            </Form.Item>
        </Form>
    );
}