const sql = require("./db.js");

// constructor
const TipoContenedor = function(tipoContenedor) {
  this.title = tipoContenedor.title;
  this.description = tipoContenedor.description;
  this.published = tipoContenedor.published;
};

TipoContenedor.create = (newTipoContenedor, result) => {
  sql.query("INSERT INTO tipoContenedores SET ?", newTipoContenedor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tipoContenedor: ", { id: res.insertId, ...newTipoContenedor });
    result(null, { id: res.insertId, ...newTipoContenedor });
  });
};

TipoContenedor.findById = (id, result) => {
  sql.query(`SELECT * FROM tipoContenedores WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tipoContenedor: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found tipoContenedor with the id
    result({ kind: "not_found" }, null);
  });
};

TipoContenedor.getAll = (title, result) => {
  let query = "SELECT * FROM tipoContenedores";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tipoContenedor: ", res);
    result(null, res);
  });
};

TipoContenedor.getAllPublished = result => {
  sql.query("SELECT * FROM tipoContenedores WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tipoContenedores: ", res);
    result(null, res);
  });
};

TipoContenedor.updateById = (id, tipoContenedor, result) => {
  sql.query(
    "UPDATE tipoContenedores SET title = ?, description = ?, published = ? WHERE id = ?",
    [tipoContenedor.title, tipoContenedor.description, tipoContenedor.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found tipoContenedor with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tipoContenedor: ", { id: id, ...tipoContenedor });
      result(null, { id: id, ...tipoContenedor });
    }
  );
};

TipoContenedor.remove = (id, result) => {
  sql.query("DELETE FROM tipoContenedores WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found tipoContenedor with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tipoContenedor with id: ", id);
    result(null, res);
  });
};

TipoContenedor.removeAll = result => {
  sql.query("DELETE FROM tipoContenedores", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tipoContenedores`);
    result(null, res);
  });
};

module.exports = TipoContenedor;