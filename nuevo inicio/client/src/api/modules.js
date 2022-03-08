import {basePath, apiVersion} from './config';

export function addModuleApi(token, data){
    const url = `${basePath}/${apiVersion}/add-module`;
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
  
export function getModulesApi(token, status) {
    const url = `${basePath}/${apiVersion}/module?active=${status}`;
  
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


export function updateModuleApi(token, user, ubicationId) {
    const url = `${basePath}/${apiVersion}/put-module/${ubicationId}`;
  
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(user)
    }
  
    return fetch(url, params).then(response => {
      return response.json();
    }).then(result => {
      return result;
    }).catch(err => {
      return err.message;
    })
  }

export function activateModuleApi(token, ubicationId, status) {
    const url = `${basePath}/${apiVersion}/activate-module/${ubicationId}`;
  
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        active: status
      })
    };
  
    return fetch(url, params)
      .then(response => {
        return response.json();
      })
      .then(result => {
        return result.message;
      })
      .catch(err => {
        return err.message;
      });
  }
  
export function deleteModuleApi(token, ubicationId) {
    const url = `${basePath}/${apiVersion}/delete-module/${ubicationId}`;
  
    const params = {
      method: "DELETE",
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
        return result.message;
      })
      .catch(err => {
        return err.message;
      });
  }