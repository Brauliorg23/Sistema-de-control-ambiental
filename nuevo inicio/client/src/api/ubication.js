import {basePath, apiVersion} from './config';

export function addUbicationApi(token, data){
    const url = `${basePath}/${apiVersion}/add-ubication`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "content-Type": "application/json",
            Authorization: token
        }
    };

    return (
        fetch(url, params).then(response => {
            return response.json();
        }).then(result => {
            return result;
        })
        .catch(err => {
        return err.message;
        })            
    );
}

export function getUbicationsApi(token) {
    const url = `${basePath}/${apiVersion}/get-ubications`;
  
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    };
    return fetch(url, params)
      .then(response => {
        console.log(response.json());
        return response.json();
      })
      .then(result => {
        return result;
      })
      .catch(err => {
        return err.message;
      });
  }
  
export function updateUbicationApi(token, user, ubicationId) {
    const url = `${basePath}/${apiVersion}/put-ubication/${ubicationId}`;
  
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

export function activateUbicationApi(token, ubicationId, status) {
    const url = `${basePath}/${apiVersion}/activate-ubication/${ubicationId}`;
  
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
  
export function deleteUbicationApi(token, ubicationId) {
    const url = `${basePath}/${apiVersion}/delete-ubication/${ubicationId}`;
  
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