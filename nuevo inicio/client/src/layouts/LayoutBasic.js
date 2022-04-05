import React from "react";
import { Result, Button } from 'antd';

export default function Error404(){
    return(
      <Result
        status="404"
        style={{
          height: '100%',
          background: '#fff',
        }}
        icon="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*aPIBS5gRPu4AAAAAAAAAAAAAARQnAQ"
        title="Sistema para la evaluación de la revisión de la clasificación"
        subTitle="Sistema para automatizar la evaluación de la revisión de la clasificación de los contenedores de la planta Nissan a2."
        
      />
    )
}