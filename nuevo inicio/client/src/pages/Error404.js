import React from "react";
import { Result, Button } from 'antd';


export default function Error404(){
    return(
        <Result
            status="404"
            title="No se encuentra"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary">Back Home</Button>}
        />
    )
}