const sql = require("./db.js");

// constructor
const TipoMaterial = function(tipoMaterial) {
  this.title = tipoMaterial.title;
  this.description = tipoMaterial.description;
  this.published = tipoMaterial.published;
};

TipoMaterial.create = (newTipoMaterial, result) => {
  sql.query("INSERT INTO tipoMateriales SET ?", newTipoMaterial, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tipoMaterial: ", { id: res.insertId, ...newTipoMaterial });
    result(null, { id: res.insertId, ...newTipoMaterial });
  });
};

TipoMaterial.findById = (id, result) => {
  sql.query(`SELECT * FROM tipoMateriales WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tipoMaterial: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found tipoMaterial with the id
    result({ kind: "not_found" }, null);
  });
};

TipoMaterial.getAll = (title, result) => {
  let query = "SELECT * FROM tipoMateriales";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tipoMaterial: ", res);
    result(null, res);
  });
};

TipoMaterial.getAllPublished = result => {
  sql.query("SELECT * FROM tipoMateriales WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tipoMateriales: ", res);
    result(null, res);
  });
};

TipoMaterial.updateById = (id, tipoMaterial, result) => {
  sql.query(
    "UPDATE tipoMateriales SET title = ?, description = ?, published = ? WHERE id = ?",
    [tipoMaterial.title, tipoMaterial.description, tipoMaterial.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found tipoMaterial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tipoMaterial: ", { id: id, ...tipoMaterial });
      result(null, { id: id, ...tipoMaterial });
    }
  );
};

TipoMaterial.remove = (id, result) => {
  sql.query("DELETE FROM tipoMateriales WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found tipoMaterial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tipoMaterial with id: ", id);
    result(null, res);
  });
};

TipoMaterial.removeAll = result => {
  sql.query("DELETE FROM tipoMateriales", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tipoMateriales`);
    result(null, res);
  });
};

module.exports = TipoMaterial;