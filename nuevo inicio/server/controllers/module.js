const Module = require("../models/module");
const ContainerTrash = require("../models/containerTrash");
const Ubication = require("../models/ubication");
const Area = require('../models/area');

function addModule(req,res){
    const module = new Module();

    const {area, codigo, title, condition, description, conten1, conten2, conten3, conten4, conten5, conten6, conten7, conten8, conten9, conten10, ubication} = req.body;

    module.codigo = codigo;
    module.title = title;
    module.description = description;
    module.active = true;
    module.condition = condition;
    module.conten1 = conten1;
    module.conten2 = conten2;
    module.conten3 = conten3;
    module.conten4 = conten4;
    module.conten5 = conten5; 
    module.conten6 = conten6;
    module.conten7 = conten7;
    module.conten8 = conten8;
    module.conten9 = conten9;
    module.conten10 = conten10;
    module.ubication = ubication;
    module.area = area;

    if(!codigo || !title || !description || !ubication ||!area){
        res.status(500).send({message: "Los campos son oblicatorios"})
    }else{
        module.save((err, createModule) => {
            console.log(err);
            if(err){
                res.status(500).send({message: "Modulo ya existe"});
            }else{
                if(!createModule){
                    res.status(500).send({message: "Error al crear el modulo"});
                }else{
                    res.status(200).send({message: "Modulo creado correctamente"});
                }
            }
        })
    }
}

function getModule(req,res){   
    const query = req.query;

    Module.find({active: query.active}).then(modules => {
        if (!modules) {
        }else{
            console.log(modules);
            ContainerTrash.populate(modules, {path: "conten1",}, function (err, modules) {
                ContainerTrash.populate(modules, {path: "conten2",}, function (err, modules) {
                    ContainerTrash.populate(modules, {path: "conten3",}, function (err, modules) {
                        ContainerTrash.populate(modules, {path: "conten4",}, function (err, modules) {
                            ContainerTrash.populate(modules, {path: "conten5",}, function (err, modules) {
                                ContainerTrash.populate(modules, {path: "conten6",}, function (err, modules) {
                                    ContainerTrash.populate(modules, {path: "conten7",}, function (err, modules) {
                                        ContainerTrash.populate(modules, {path: "conten8",}, function (err, modules) {
                                            ContainerTrash.populate(modules, {path: "conten9",}, function (err, modules) {
                                                ContainerTrash.populate(modules, {path: "conten10",}, function (err, modules) {
                                                    Ubication.populate(modules, {path: "ubication",}, function (err, modules) {
                                                        Area.populate(modules, {path: "area"}, function (err, modules){
                                                            res.status(200).send(modules);
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            }); 
        }         
    });
}

function updateModule(req,res){
    let moduleTrashData = req.body;
    const params = req.params;

    Module.findByIdAndUpdate({_id: params.id}, moduleTrashData, (err, moduleUpdate) =>{
        if (err) {
            res.status(500).send({ message: "Error del servidor." });
        } else {
            if (!moduleUpdate) {
                res.status(404).send({ message: "No se ha encontrado ningun module." });
            } else {
                res.status(200).send({ message: "modulo actualizado correctamente." });
            }
        }
    })
}

function activateModule(req, res){
    const {id} = req.params;
    const {active} = req.body;

    Module.findByIdAndUpdate(id, {active}, (err, moduleStored)=>{
        if (err) {
            res.status(500).send({ message: "Erro del servidor." });
          } else {
            if (!moduleStored) {
              res.status(404).send({ message: "no se ha encontrad el modulo." });
            } else {
              if (active === true) {
                res.status(200).send({ message: "modulo activado correctamente." });
              } else {
                res.status(200).send({ message: "modulo desactivado correctamente." });
              }
            }
          }
    })
}

function deleteModule(req, res){
    const {id}=req.params;

    Module.findByIdAndRemove(id, (err, moduleDelete) => {
        if (err) {
            res.status(500).send({ message: "Error del servidor." });
          } else {
            if (!moduleDelete) {
              res.status(404).send({ message: "Modulo no encontrado." });
            } else {
              res
                .status(200)
                .send({ message: "El modulo ha sido eliminado correctamente." });
            }
          }
    })
}

module.exports = {
    getModule,
    addModule,
    updateModule,
    activateModule,
    deleteModule
}