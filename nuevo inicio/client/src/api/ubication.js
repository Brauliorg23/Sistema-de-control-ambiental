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
        return response.json();
      })
      .then(result => {
        return result;
      })
      .catch(err => {
        return err.message;
      });
  }
  
export function getUbicationsActiveApi(token, status) {
    const url = `${basePath}/${apiVersion}/ubications-active?active=${status}`;
  
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

export function uploadAvatarApi(token,avatar, userId){
    const url = `${basePath}/${apiVersion}/upload-avatar/${userId}`;
  
    const formData = new FormData();
    formData.append("avatar", avatar, avatar.name);
  
    const params = {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: token
      }
    }
  
    return fetch(url, params)
      .then(response => {
        return response.json();
      })
      .then(result => {
        return result;
      })
      .catch(err => {
        return err.message;
      })
  }
  
export function getAvatarApi(avatarName){
    const url = `${basePath}/${apiVersion}/get-avatar/${avatarName}`;
  
    return fetch (url)
      .then(response => {
        return response.url;
      })
      .catch(err =>{
        return err.message;
      })
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