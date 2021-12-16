const sql = require("./db.js");

// constructor
const TipoReporteMaterial = function(tipoReporteMaterial) {
  this.title = tipoReporteMaterial.title;
  this.description = tipoReporteMaterial.description;
  this.published = tipoReporteMaterial.published;
};

TipoReporteMaterial.create = (newTipoReporteMaterial, result) => {
  sql.query("INSERT INTO tipoReporteMateriales SET ?", newTipoReporteMaterial, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tipoReporteMaterial: ", { id: res.insertId, ...newTipoReporteMaterial });
    result(null, { id: res.insertId, ...newTipoReporteMaterial });
  });
};

TipoReporteMaterial.findById = (id, result) => {
  sql.query(`SELECT * FROM tipoReporteMateriales WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tipoReporteMaterial: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found tipoReporteMaterial with the id
    result({ kind: "not_found" }, null);
  });
};

TipoReporteMaterial.getAll = (title, result) => {
  let query = "SELECT * FROM tipoReporteMateriales";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tipoReporteMaterial: ", res);
    result(null, res);
  });
};

TipoReporteMaterial.getAllPublished = result => {
  sql.query("SELECT * FROM tipoReporteMateriales WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tipoReporteMateriales: ", res);
    result(null, res);
  });
};

TipoReporteMaterial.updateById = (id, tipoReporteMaterial, result) => {
  sql.query(
    "UPDATE tipoReporteMateriales SET title = ?, description = ?, published = ? WHERE id = ?",
    [tipoReporteMaterial.title, tipoReporteMaterial.description, tipoReporteMaterial.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found tipoReporteMaterial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tipoReporteMaterial: ", { id: id, ...tipoReporteMaterial });
      result(null, { id: id, ...tipoReporteMaterial });
    }
  );
};

TipoReporteMaterial.remove = (id, result) => {
  sql.query("DELETE FROM tipoReporteMateriales WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found tipoReporteMaterial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tipoReporteMaterial with id: ", id);
    result(null, res);
  });
};

TipoReporteMaterial.removeAll = result => {
  sql.query("DELETE FROM tipoReporteMateriales", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tipoReporteMateriales`);
    result(null, res);
  });
};

module.exports = TipoReporteMaterial;