const Ubication = require("../models/ubication");

function addUbication(req, res){
    const ubication = new Ubication();

    const {codigo, title, description } = req.body;
    ubication.codigo = codigo;
    ubication.title = title;
    ubication.description = description;
    ubication.active = true;
    
    if (!description || !title || !codigo) {
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
    Ubication.find().then(ubication => {
        if(!ubication){
            res.status(404).send({message: "No se ha encontrado ninguna ubicasion. "});
        }else{
            res.status(200).send({ubication});
        }
    });
}

function getUbicationssActive(req, res){
  const query = req.query;

  Ubication.find({active: query.active}).then(ubications => {
      if(!ubications){
          res.status(404).send({message: "No se ha encontrado ningun ususario. "});
      }else{
          res.status(200).send({ubications});
      }
  });
}

function updateUbication(req, res) {
    let ubicationData = req.body;
    const params = req.params;
  
    Ubication.findByIdAndUpdate({_id: params.id}, ubicationData, (err, ubicationUpdate) => {
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
  
    Ubication.findByIdAndUpdate(id, { active }, (err, ubicationStored) => {
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
  
function uploadAvatar(req, res) {
    const params = req.params;
    console.log("uploadAvatar");
    Ubication.findById({ _id: params.id }, (err, ubicationData) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor." });
      } else {
        if (!ubicationData) {
          res.status(404).send({ message: "Nose ha encontrado ningun usuario." });
        } else {
          let ubication = ubicationData;
  
          if (req.files) {
            let filePath = req.files.avatar.path;            
            let fileSplit = filePath.split("\\");            
            let fileName = fileSplit[2];            
            let extSplit = fileName.split(".");
            let fileExt = extSplit[1];
  
            if (fileExt !== "png" && fileExt !== "jpg") {
              res.status(400).send({
                message:
                  "La extension de la imagen no es valida. (Extensiones permitidas: .png y .jpg)"
              });
            } else {
              ubication.avatar = fileName;
              ubication.findByIdAndUpdate(
                { _id: params.id },
                ubication,
                (err, ubicationResult) => {
                  if (err) {
                    res.status(500).send({ message: "Error del servidor." });
                  } else {
                    if (!ubicationResult) {
                      res
                        .status(404)
                        .send({ message: "No se ha encontrado ningun usuario." });
                    } else {
                      res.status(200).send({ avatarName: fileName });
                    }
                  }
                }
              );
            }
          }
        }
      }
    });
  }
  
function getAvatar(req, res) { 
    const avatarName = req.params.avatarName;
    const filePath = "./uploads/avatar/" + avatarName;
  
    fs.exists(filePath, exists => {
      if (!exists) {
        res.status(404).send({ message: "El avatar que buscas no existe." });
      } else {
        res.sendFile(path.resolve(filePath));
      }
    });
  }

function deleteUbication(req, res) {
    const { id } = req.params;
  
    Ubication.findByIdAndRemove(id, (err, UbicationDeleted) => {
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
    getUbicationssActive,
    updateUbication,
    uploadAvatar,
    getAvatar,
    activateUbication,
    deleteUbication
}