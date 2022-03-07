import {basePath, apiVersion} from './config';

export function addModuleApi(token, data){
    const url = `${basePath}/${apiVersion}/add-report`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "content-Type": "application/json",
            Authorization: token
        }
    };

    console.log(url);
    console.log(params);
    return (
        fetch(url, params).then(response => {
          console.log(response.json());
          return response.json();
        }).then(result => {
            return result;
        })
        .catch(err => {
        return err.message;
        })            
    );
}

export function getModulesApi(token) {
    const url = `${basePath}/${apiVersion}/report`;
  
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    };
    return fetch(url, params)
      .then(response => {
        return response.json();
      })
      .then(result => {
        return result;
      })
      .catch(err => {
        return err.message;
    });
}