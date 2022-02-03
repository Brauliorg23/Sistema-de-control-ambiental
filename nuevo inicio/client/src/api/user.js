import {basePath, apiVersion} from './config';

export function signUpApi(data){
    const url = `${basePath}/${apiVersion}/sign-up`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "aplication/json"
        }
    };

    console.log(data);
    fetch(url, params).then(response => {
            console.log(response);
        });        
}