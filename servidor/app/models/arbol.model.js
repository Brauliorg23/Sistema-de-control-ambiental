const sql = require("./db.js");

// constructor
const Arbol = function(arbol) {
  this.title = arbol.title;
  this.description = arbol.description;
  this.published = arbol.published;
};

Arbol.create = (newArbol, result) => {
  sql.query("INSERT INTO arboles SET ?", newArbol, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created arbol: ", { id: res.insertId, ...newArbol });
    result(null, { id: res.insertId, ...newArbol });
  });
};

Arbol.findById = (id, result) => {
  sql.query(`SELECT * FROM arboles WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found arbol: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found arbol with the id
    result({ kind: "not_found" }, null);
  });
};

Arbol.getAll = (title, result) => {
  let query = "SELECT * FROM arboles";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("arbol: ", res);
    result(null, res);
  });
};

Arbol.getAllPublished = result => {
  sql.query("SELECT * FROM arboles WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("arboles: ", res);
    result(null, res);
  });
};

Arbol.updateById = (id, arbol, result) => {
  sql.query(
    "UPDATE arbol SET title = ?, description = ?, published = ? WHERE id = ?",
    [arbol.title, arbol.description, arbol.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found arbol with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated arbol: ", { id: id, ...arbol });
      result(null, { id: id, ...arbol });
    }
  );
};

Arbol.remove = (id, result) => {
  sql.query("DELETE FROM arboles WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found arbol with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted arbol with id: ", id);
    result(null, res);
  });
};

Arbol.removeAll = result => {
  sql.query("DELETE FROM arboles", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} arboles`);
    result(null, res);
  });
};

module.exports = Arbol;