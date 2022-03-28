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
        title="Hello World"
        subTitle="Sorry, you are not authorized to access this page."
      />
    )
}