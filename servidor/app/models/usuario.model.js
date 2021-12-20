const sql = require("./db.js");

// constructor
const Usuario = function(usuario) {
  this.nombre = usuario.nombre;
  this.apellidoP = usuario.apellidoP;
  this.apellidoM = usuario.apellidoM;
  this.password = usuario.password;
  this.published = usuario.published;
};

Usuario.create = (newUsuario, result) => {
  sql.query("INSERT INTO Usuarios SET ?", newUsuario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created usuario: ", { id: res.insertId, ...newUsuario });
    result(null, { id: res.insertId, ...newUsuario });
  });
};

Usuario.findById = (id, result) => {
  sql.query(`SELECT * FROM ubicaciones WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found ubicacion: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found ubicacion with the id
    result({ kind: "not_found" }, null);
  });
};

Ubicacion.getAll = (title, result) => {
  let query = "SELECT * FROM ubicaciones";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("ubicacion: ", res);
    result(null, res);
  });
};

Ubicacion.getAllPublished = result => {
  sql.query("SELECT * FROM ubicaciones WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("ubicaciones: ", res);
    result(null, res);
  });
};

Ubicacion.updateById = (id, ubicacion, result) => {
  sql.query(
    "UPDATE ubicaciones SET title = ?, description = ?, published = ? WHERE id = ?",
    [ubicacion.title, ubicacion.description, ubicacion.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found ubicacion with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated ubicacion: ", { id: id, ...ubicacion });
      result(null, { id: id, ...ubicacion });
    }
  );
};

Ubicacion.remove = (id, result) => {
  sql.query("DELETE FROM ubicaciones WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found ubicacion with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted ubicacion with id: ", id);
    result(null, res);
  });
};

Ubicacion.removeAll = result => {
  sql.query("DELETE FROM ubicaciones", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} ubicaciones`);
    result(null, res);
  });
};

module.exports = Ubicacion;