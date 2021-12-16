const sql = require("./db.js");

// constructor
const Area = function(area) {
  this.title = area.title;
  this.description = area.description;
  this.published = area.published;
};

Area.create = (newArea, result) => {
  sql.query("INSERT INTO areas SET ?", newArea, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created area: ", { id: res.insertId, ...newArea });
    result(null, { id: res.insertId, ...newArea });
  });
};

Area.findById = (id, result) => {
  sql.query(`SELECT * FROM areas WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found area: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found area with the id
    result({ kind: "not_found" }, null);
  });
};

Area.getAll = (title, result) => {
  let query = "SELECT * FROM areaes";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("area: ", res);
    result(null, res);
  });
};

Area.getAllPublished = result => {
  sql.query("SELECT * FROM areas WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("areas: ", res);
    result(null, res);
  });
};

Area.updateById = (id, area, result) => {
  sql.query(
    "UPDATE areas SET title = ?, description = ?, published = ? WHERE id = ?",
    [area.title, area.description, area.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found area with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated area: ", { id: id, ...area });
      result(null, { id: id, ...area });
    }
  );
};

Area.remove = (id, result) => {
  sql.query("DELETE FROM areas WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found area with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted area with id: ", id);
    result(null, res);
  });
};

Area.removeAll = result => {
  sql.query("DELETE FROM areas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} areas`);
    result(null, res);
  });
};

module.exports = Area;