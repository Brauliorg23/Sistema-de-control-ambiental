import React, { useState } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import {
  emailValidation,
} from "../../../../utils/formValidation";
import { addUbicationApi } from "../../../../api/ubication";
import { getAccessTokenApi } from "../../../../api/auth";


export default function AddUbication(props) {
  const { setIsVisibleModal, setReloadUbications } = props;
  const [ubication, setUbication] = useState({
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
        setUbication({
        ...ubication,
        [e.target.name]: e.target.checked
      });
    } else {      
        setUbication({
        ...ubication,
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
    const titleVal = ubication.title;
    const descriptionVal =ubication.description;
    const codigoVal = ubication.codigo;
    const privacyPolicyVal = ubication.privacyPolicy;
    if ( !titleVal || !descriptionVal || !privacyPolicyVal || !codigoVal) {
      notification["error"]({
        message: "Todos los campos son obligatorios"
      });
    } else {
        const accesToken = getAccessTokenApi();
        addUbicationApi(accesToken, ubication).then( result => {
            notification["success"]({
                message: result.message
              });
              setIsVisibleModal(false);
              setReloadUbications(true);
              resetForm();
        })
        // const result = await addUbicationApi(accesToken, ubication);
        // console.log(result);
        // if (!result.ok) {
        //   notification["error"]({
        //     message: result.message
        //   });
        //   resetForm();
        // } else {
        //   notification["success"]({
        //     message: result.message
        //   });          
        //   setIsVisibleModal(false);
        //   setReloadUbications(true);
        //   resetForm();
        // }
    }
};

  const resetForm = () => {
    const inputs = document.getElementsByTagName("input");

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].classList.remove("success");
      inputs[i].classList.remove("error");
    }

    setUbication({
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
    // <Form className="register-form" onSubmitCapture={register} onChange={changeForm}>
    //   <Form.Item>
    //       <Input
    //         type="text"
    //         name="title"
    //         placeholder="Nombre"
    //         className="register-form__input"
    //         value={ubication.title}
    //         onChange={inputValidation}
    //       />
    //   </Form.Item>
    //   <Form.Item>
    //       <Input
    //         type="text"
    //         name="description"
    //         placeholder="Descripcion"
    //         className="register-form__input"
    //         value={ubication.description}
    //         onChange={inputValidation}
    //       />
    //   </Form.Item>
    //   <Form.Item>
    //       <Input
    //         type="text"
    //         name="codigo"
    //         placeholder="Identificador"
    //         className="register-form__input"
    //         value={ubication.codigo}
    //         onChange={inputValidation}
    //       />
    //   </Form.Item>
    //   <Form.Item>
    //     <Checkbox
    //       name="privacyPolicy"
    //       onChange={inputValidation}
    //       checked={ubication.privacyPolicy}
    //     >
    //       He leído y acepto la política de privacidad.
    //     </Checkbox>
    //   </Form.Item>
    //   <Form.Item>
    //     <Button htmlType="submit" className="register-form__button">
    //       Crear cuenta
    //     </Button>
    //   </Form.Item>
    // </Form>
    <div>
      holalalalalal
    </div>
  );
}