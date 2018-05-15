"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teacherDao_1 = require("../dao/teacherDao");
let route = express_1.default.Router();
route.get('/', (req, res) => {
    teacherDao_1.TeacherService.getAllTeachers().then((teachers) => {
        res.status(200).json(teachers);
    });
});
route.post('/:sid', (req, res) => {
    let sId = req.params.sid;
    let newTeacher = {
        id: 0,
        name: req.body.name
    };
    teacherDao_1.TeacherService.addNewTeacher(newTeacher, sId).then((teacher) => {
        res.status(200).json(teacher);
    });
});
route.get('/:id', (req, res) => {
    let id = req.params.id;
    teacherDao_1.TeacherService.getTeacherById(id).then((teacher) => {
        res.status(200).json(teacher);
    });
});
route.get('/:id/batches', (req, res) => {
    let id = req.params.id;
    teacherDao_1.TeacherService.getTeacherBatches(id).then((batches) => {
        res.status(200).json(batches);
    });
});
route.delete('/:id', (req, res) => {
    let id = req.params.id;
    try {
        teacherDao_1.TeacherService.deleteTeacher(id).then((result) => {
            if (result === 0)
                throw Error('No Teacher found for id ' + id);
            res.status(200).json({
                success: true,
                id: result
            });
        }).catch(err => {
            res.status(400).json({
                error: ""
            });
        });
    }
    catch (err) {
        res.status(400).json({
            error: ""
        });
    }
});
route.put('/:id', (req, res) => {
    let id = req.params.id;
    let name = req.body.name;
    try {
        teacherDao_1.TeacherService.updateTeacher(id, name).then((result) => {
            if (result[0] == 0)
                throw Error('No Teacher found for id ' + id);
            res.status(200).json({
                success: true,
                id: result
            });
        }).catch(err => {
            res.status(400).json({
                error: ""
            });
        });
    }
    catch (err) {
        res.status(400).json({
            error: ""
        });
    }
});
exports.default = route;
