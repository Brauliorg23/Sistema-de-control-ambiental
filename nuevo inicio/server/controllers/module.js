const Module = require("../models/module");
const ContainerTrash = require("../models/containerTrash");
const Ubication = require("../models/ubication");

function addModule(req,res){
    const module = new Module();

    const {codigo, title, description, conten1, conten2, conten3, conten4, conten5, conten6, conten7, conten8, conten9, conten10, ubication} = req.body;

    module.codigo = codigo;
    module.title = title;
    module.description = description;
    module.active = true;
    module.condition = true;
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

    if(!codigo || !title || !description || !ubication){
        res.status(500).send({message: "Los campos son oblicatorios"})
    }else{
        module.save((err, createModule) => {
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
    Module.find({}, function (err, modules){
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

module.exports = {
    getModule,
    addModule
}