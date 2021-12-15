const sql = require("./db.js");

// constructor
const TipoUsuario = function(tipoUsuario) {
  this.title = tipoUsuario.title;
  this.description = tipoUsuario.description;
  this.published = tipoUsuario.published;
};

TipoUsuario.create = (newTipoUsuario, result) => {
  sql.query("INSERT INTO tipoUsuarios SET ?", newTipoUsuario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tipoUsuario: ", { id: res.insertId, ...newTipoUsuario });
    result(null, { id: res.insertId, ...newTipoUsuario });
  });
};

TipoUsuario.findById = (id, result) => {
  sql.query(`SELECT * FROM tipoUsuarios WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tipoUsuario: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found tipoUsuario with the id
    result({ kind: "not_found" }, null);
  });
};

TipoUsuario.getAll = (title, result) => {
  let query = "SELECT * FROM tipoUsuarios";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tipoUsuario: ", res);
    result(null, res);
  });
};

TipoUsuario.getAllPublished = result => {
  sql.query("SELECT * FROM tipoUsuarios WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tipoUsuarios: ", res);
    result(null, res);
  });
};

TipoUsuario.updateById = (id, tipoUsuario, result) => {
  sql.query(
    "UPDATE tipoUsuarios SET title = ?, description = ?, published = ? WHERE id = ?",
    [tipoUsuario.title, tipoUsuario.description, tipoUsuario.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found tipoUsuario with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tipoUsuario: ", { id: id, ...tipoUsuario });
      result(null, { id: id, ...tipoUsuario });
    }
  );
};

TipoUsuario.remove = (id, result) => {
  sql.query("DELETE FROM tipoUsuarios WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found tipoUsuario with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tipoUsuario with id: ", id);
    result(null, res);
  });
};

TipoUsuario.removeAll = result => {
  sql.query("DELETE FROM tipoUsuarios", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tipoUsuarios`);
    result(null, res);
  });
};

module.exports = TipoUsuario;