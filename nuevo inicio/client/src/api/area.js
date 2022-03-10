import {basePath, apiVersion} from './config';

export function addAreaApi(token, data){
    const url = `${basePath}/${apiVersion}/add-area`;
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

export function getAreasApi(token) {
    const url = `${basePath}/${apiVersion}/areas`;
  
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
  
export function getAreasActiveApi(token, status) {
    const url = `${basePath}/${apiVersion}/areas-active?active=${status}`;
  
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
  
export function updateAreaApi(token, user, areaId) {
    const url = `${basePath}/${apiVersion}/put-area/${areaId}`;
  
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

export function activateAreaApi(token, areaId, status) {
    const url = `${basePath}/${apiVersion}/activate-area/${areaId}`;
  
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
  
export function deleteAreaApi(token, areaId) {
    const url = `${basePath}/${apiVersion}/delete-area/${areaId}`;
  
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