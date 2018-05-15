"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subjectDao_1 = require("../dao/subjectDao");
let route = express_1.default.Router();
route.get('/', (req, res) => {
    subjectDao_1.SubjectService.getAllSubjects().then((subjects) => {
        res.status(200).json(subjects);
    });
});
route.post('/courses/:cid', (req, res) => {
    let cid = req.params.cid;
    let name = req.body.name;
    subjectDao_1.SubjectService.addNewSubject(cid, name).then((subject) => {
        res.status(200).json(subject);
    });
});
route.get('/:id', (req, res) => {
    let id = req.params.id;
    subjectDao_1.SubjectService.getSubjectById(id).then((subjects) => {
        res.status(200).json(subjects);
    });
});
route.get('/:id/teachers', (req, res) => {
    let id = req.params.id;
    subjectDao_1.SubjectService.getTeachersBySubject(id).then((teachers) => {
        res.status(200).json(teachers);
    });
});
route.delete('/:id', (req, res) => {
    let id = req.params.id;
    try {
        subjectDao_1.SubjectService.deleteSubject(id).then((result) => {
            if (result === 0)
                throw Error('No Subject found for id ' + id);
            res.status(200).json({
                success: true,
                id: result
            });
        }).catch(err => {
            res.status(400).json({
                error: "could not delete subject with id: " + id,
            });
        });
    }
    catch (err) {
        res.status(400).json({
            error: "could not delete subject with id: " + id
        });
    }
});
route.put('/:id', (req, res) => {
    let id = req.params.id;
    let name = req.body.name;
    try {
        subjectDao_1.SubjectService.updateSubject(id, name).then((result) => {
            if (result[0] == 0)
                throw Error('No Subject found for id ' + id);
            res.status(200).json({
                success: true,
                id: result
            });
        }).catch(err => {
            res.status(400).json({
                error: "Could not update subject",
            });
        });
    }
    catch (err) {
        res.status(400).json({
            error: "Could not update subject"
        });
    }
});
exports.default = route;
