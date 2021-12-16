const sql = require("./db.js");

// constructor
const TipoReporteContenedor = function(tipoReporteContenedor) {
  this.title = tipoReporteContenedor.title;
  this.description = tipoReporteContenedor.description;
  this.published = tipoReporteContenedor.published;
};

TipoReporteContenedor.create = (newTipoReporteContenedor, result) => {
  sql.query("INSERT INTO tipoReporteContenedores SET ?", newTipoReporteContenedor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tipoReporteContenedor: ", { id: res.insertId, ...newTipoReporteContenedor });
    result(null, { id: res.insertId, ...newTipoReporteContenedor });
  });
};

TipoReporteContenedor.findById = (id, result) => {
  sql.query(`SELECT * FROM tipoReporteContenedores WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tipoReporteContenedor: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found tipoReporteContenedor with the id
    result({ kind: "not_found" }, null);
  });
};

TipoReporteContenedor.getAll = (title, result) => {
  let query = "SELECT * FROM tipoReporteContenedores";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tipoReporteContenedor: ", res);
    result(null, res);
  });
};

TipoReporteContenedor.getAllPublished = result => {
  sql.query("SELECT * FROM tipoReporteContenedores WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tipoReporteContenedores: ", res);
    result(null, res);
  });
};

TipoReporteContenedor.updateById = (id, tipoReporteContenedor, result) => {
  sql.query(
    "UPDATE tipoReporteContenedores SET title = ?, description = ?, published = ? WHERE id = ?",
    [tipoReporteContenedor.title, tipoReporteContenedor.description, tipoReporteContenedor.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found tipoReporteContenedor with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tipoReporteContenedor: ", { id: id, ...tipoReporteContenedor });
      result(null, { id: id, ...tipoReporteContenedor });
    }
  );
};

TipoReporteContenedor.remove = (id, result) => {
  sql.query("DELETE FROM tipoReporteContenedores WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found tipoReporteContenedor with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tipoReporteContenedor with id: ", id);
    result(null, res);
  });
};

TipoReporteContenedor.removeAll = result => {
  sql.query("DELETE FROM tipoReporteContenedores", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tipoReporteContenedores`);
    result(null, res);
  });
};

module.exports = TipoReporteContenedor;