const Area = require("../models/area");

function addArea(req, res){
    const area = new Area();

    const {codigo, title, description } = req.body;
    console.log(req.body);
    area.codigo = codigo;
    area.title = title;
    area.description = description;
    area.active = true;
    
    if (!description || !title || !codigo) {
        res.status(500).send({message: "Los campos son obligatorios"});
    }else{    
        area.save((err, createdArea) => {
            if (err) {
                res.status(500).send({message: "Ubicasion ya existe"});
            }else{
               if(!createdArea){
                   res.status(500).send({message: "Error al crear la area"});
               }else{
                   res.status(200).send({message: "Area creada correctamente"});
               }
            }
        })
    }
}

function getAreas(req, res){
  Area.find().then(area => {
      if(!area){
          res.status(404).send({message: "No se ha encontrado ninguna area. "});
      }else{
          res.status(200).send({area});
      }
  });
}

function getAreasActive(req, res){
    const query = req.query;
  
    Area.find({active: query.active}).then(areas => {
        if(!areas){
            res.status(404).send({message: "No se ha encontrado ningun ususario. "});
        }else{
            res.status(200).send({areas});
        }
    });
  }

function updateArea(req, res) {
    let areaData = req.body;
    const params = req.params;
  
    Area.findByIdAndUpdate({_id: params.id}, areaData, (err, areaUpdate) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor." });
      } else {
        if (!areaUpdate) {
          res.status(404).send({ message: "No se ha encontrado ningun area." });
        } else {
          res.status(200).send({ message: "area actualizado correctamente." });
        }
      }
    });
  }

function activateArea(req, res) {
    const { id } = req.params;
    const { active } = req.body;
  
    Area.findByIdAndUpdate(id, { active }, (err, areaStored) => {
      if (err) {
        res.status(500).send({ message: "Erro del servidor." });
      } else {
        if (!areaStored) {
          res.status(404).send({ message: "No se ha encontrad el area." });
        } else {
          if (active === true) {
            res.status(200).send({ message: "Area activado correctamente." });
          } else {
            res.status(200).send({ message: "Area desactivado correctamente." });
          }
        }
      }
    });
  }

function deleteArea(req, res) {
    const { id } = req.params;
  
    Area.findByIdAndRemove(id, (err, areaDeleted) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor." });
      } else {
        if (!areaDeleted) {
          res.status(404).send({ message: "Area no encontrado." });
        } else {
          res
            .status(200)
            .send({ message: "El Area ha sido eliminado correctamente." });
        }
      }
    });
}

module.exports = {
    addArea,
    activateArea,
    updateArea,
    getAreas,
    getAreasActive,
    deleteArea
}

