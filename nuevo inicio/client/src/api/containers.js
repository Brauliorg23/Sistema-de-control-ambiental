import {basePath, apiVersion} from './config';

export function addContainerApi(token, data){
    const url = `${basePath}/${apiVersion}/add-container`;
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

export function getContainersApi(token) {
    const url = `${basePath}/${apiVersion}/get-container`;
  
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
  
export function getContainersActiveApi(token, status) {
    const url = `${basePath}/${apiVersion}/containersTrash-active?active=${status}`;
  
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

export function updateContainerApi(token, user, containerId) {
    const url = `${basePath}/${apiVersion}/put-container/${containerId}`;
  
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

export function activateContainerApi(token, containerId, status) {
    const url = `${basePath}/${apiVersion}/activate-container/${containerId}`;
  
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
  
export function deleteContainerApi(token, containerId) {
    const url = `${basePath}/${apiVersion}/delete-container/${containerId}`;
  
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