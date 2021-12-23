import http from "../http-common";

class AreaDataService {
  getAll() {
    return http.get("/areas");
  }

  get(id) {
    return http.get(`/areas/${id}`);
  }

  create(data) {
    return http.post("/areas", data);
  }

  update(id, data) {
    return http.put(`/areas/${id}`, data);
  }

  delete(id) {
    return http.delete(`/areas/${id}`);
  }

  deleteAll() {
    return http.delete(`/areas`);
  }

  findByTitle(title) {
    return http.get(`/areas?title=${title}`);
  }
}

export default new AreaDataService();
