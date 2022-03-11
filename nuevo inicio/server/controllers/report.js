const Report = require("../models/report");
const Module = require("../models/module");
const User = require("../models/user");
const ContainerTrash = require("../models/containerTrash");
const Ubication = require("../models/ubication");
const Area = require('../models/area');

function addReport(req, res){
    const report = new Report();

    const {codigo, title, description, date, photo, module, user, conten1, conten2, conten3, conten4, conten5, conten6, conten7, conten8, conten9, conten10} = req.body;

    report.codigo = codigo;
    report.title = title;
    report.description = description;
    report.date = date;
    report.photo = photo;
    report.module = module;
    report.user = user;
    report.conten1 = conten1;
    report.conten2 = conten2;
    report.conten3 = conten3;
    report.conten4 = conten4;
    report.conten5 = conten5;
    report.conten6 = conten6;
    report.conten7 = conten7;
    report.conten8 = conten8;
    report.conten9 = conten9;
    report.conten10 = conten10;


    if (!codigo || !title || !description || !date || !module || !user) {
        res.status(500).send({message: "Los campos son oblicatorios"})
    } else {
        report.save((err, createReport) => {
            if (err) {
                res.status(500).send({message: "Report ya existe"});
            } else {
                if (!createReport) {
                    res.status(500).send({message: "Error al crear el reporte"});
                } else {
                    res.status(200).send({message: "Reporte creado correctamente"});
                }
            }
        })
    }
}

function getReport(req, res){
    Report.find().then(report => {
        if (!report) {
            res.status(404).send({message: "No se ha encontrado ningun reporte. "});
        } else {
           Module.populate(report, {path:"module"}, function(err, modules){
                ContainerTrash.populate(modules, {path: "module.conten1"}, function(errm, modules){
                    ContainerTrash.populate(modules, {path: "module.conten2",}, function (err, modules) {
                        ContainerTrash.populate(modules, {path: "module.conten3",}, function (err, modules) {
                            ContainerTrash.populate(modules, {path: "module.conten4",}, function (err, modules) {
                                ContainerTrash.populate(modules, {path: "module.conten5",}, function (err, modules) {
                                    ContainerTrash.populate(modules, {path: "module.conten6",}, function (err, modules) {
                                        ContainerTrash.populate(modules, {path: "module.conten7",}, function (err, modules) {
                                            ContainerTrash.populate(modules, {path: "module.conten8",}, function (err, modules) {
                                                ContainerTrash.populate(modules, {path: "module.conten9",}, function (err, modules) {
                                                    ContainerTrash.populate(modules, {path: "module.conten10",}, function (err, modules) {
                                                        Ubication.populate(modules, {path: "module.ubication",}, function (err, report) {
                                                            User.populate(report, {path:"user"}, function(err, report){                                                                                                                                
                                                                Area.populate(report, {path: "module.area"}, function (err, report){
                                                                    res.status(200).send(report);
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
                });
           });
        }
    });
}

module.exports = {
    addReport,
    getReport
}