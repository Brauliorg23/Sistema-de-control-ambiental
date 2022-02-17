const ubication = require("../models/ubication");

function addUbication(req, res){
    const ubication = new Ubication();

    const {idUbication, title, description } = req.body;
    ubication.idUbication = idUbication;
    ubication.title = title;
    ubication.description = description;
    ubication.active = true;
    
    if (!description || !title || !idUbication) {
        res.status(500).send({message: "Los campos son obligatorios"});
    }else{    
        ubication.save((err, createdUbication) => {
            if (err) {
                res.status(500).send({message: "Ubicasion ya existe"});
            }else{
               if(!createdUbication){
                   res.status(500).send({message: "Error al crear la ubicacion"});
               }else{
                   res.status(200).send({ubication: createdUbication});
               }
            }
        })
    }
}

function getUbications(req, res){
    ubication.find().then(ubication => {
        if(!ubication){
            res.status(404).send({message: "No se ha encontrado ninguna ubicasion. "});
        }else{
            res.status(200).send({ubication});
        }
    });
}

function updateUbication(req, res) {
    let ubicationData = req.body;
    const params = req.params;
  
    ubication.findByIdAndUpdate({_id: params.id}, ubicationData, (err, ubicationUpdate) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor." });
      } else {
        if (!ubicationUpdate) {
          res.status(404).send({ message: "No se ha encontrado ningun ubication." });
        } else {
          res.status(200).send({ message: "ubication actualizado correctamente." });
        }
      }
    });
  }

function activateUbication(req, res) {
    const { id } = req.params;
    const { active } = req.body;
  
    ubication.findByIdAndUpdate(id, { active }, (err, ubicationStored) => {
      if (err) {
        res.status(500).send({ message: "Erro del servidor." });
      } else {
        if (!ubicationStored) {
          res.status(404).send({ message: "no se ha encontrad el ubication." });
        } else {
          if (active === true) {
            res.status(200).send({ message: "ubication activado correctamente." });
          } else {
            res.status(200).send({ message: "ubication desactivado correctamente." });
          }
        }
      }
    });
  }
  

function deleteUbication(req, res) {
    const { id } = req.params;
  
    ubication.findByIdAndRemove(id, (err, UbicationDeleted) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor." });
      } else {
        if (!UbicationDeleted) {
          res.status(404).send({ message: "Ubication no encontrado." });
        } else {
          res
            .status(200)
            .send({ message: "El Ubication ha sido eliminado correctamente." });
        }
      }
    });
  }

module.exports = {
    addUbication,
    getUbications,
    updateUbication,
    activateUbication,
    deleteUbication
}