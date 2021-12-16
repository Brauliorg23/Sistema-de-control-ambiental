const sql = require("./db.js");

// constructor
const TipoHerramienta = function(tipoHerramienta) {
  this.title = tipoHerramienta.title;
  this.description = tipoHerramienta.description;
  this.published = tipoHerramienta.published;
};

TipoHerramienta.create = (newTipoHerramienta, result) => {
  sql.query("INSERT INTO tipoHerramientas SET ?", newTipoHerramienta, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tipoHerramienta: ", { id: res.insertId, ...newTipoHerramienta });
    result(null, { id: res.insertId, ...newTipoHerramienta });
  });
};

TipoHerramienta.findById = (id, result) => {
  sql.query(`SELECT * FROM tipoHerramientas WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tipoHerramienta: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found tipoHerramienta with the id
    result({ kind: "not_found" }, null);
  });
};

TipoHerramienta.getAll = (title, result) => {
  let query = "SELECT * FROM tipoHerramientas";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tipoHerramienta: ", res);
    result(null, res);
  });
};

TipoHerramienta.getAllPublished = result => {
  sql.query("SELECT * FROM tipoHerramientas WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tipoHerramientas: ", res);
    result(null, res);
  });
};

TipoHerramienta.updateById = (id, tipoHerramienta, result) => {
  sql.query(
    "UPDATE tipoHerramientas SET title = ?, description = ?, published = ? WHERE id = ?",
    [tipoHerramienta.title, tipoHerramienta.description, tipoHerramienta.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found tipoHerramienta with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tipoHerramienta: ", { id: id, ...tipoHerramienta });
      result(null, { id: id, ...tipoHerramienta });
    }
  );
};

TipoHerramienta.remove = (id, result) => {
  sql.query("DELETE FROM tipoHerramientas WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found tipoHerramienta with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tipoHerramienta with id: ", id);
    result(null, res);
  });
};

TipoHerramienta.removeAll = result => {
  sql.query("DELETE FROM tipoHerramientas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tipoHerramientas`);
    result(null, res);
  });
};

module.exports = TipoHerramienta;