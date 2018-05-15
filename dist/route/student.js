"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentDao_1 = require("../dao/studentDao");
const courseDao_1 = require("../dao/courseDao");
let route = express_1.default.Router();
route.get('/', (req, res) => {
    studentDao_1.StudentService.getStudents().then((students) => {
        res.status(200).json(students);
    });
});
route.post('/', (req, res) => {
    let cid = req.body.cid;
    let bid = req.body.bid;
    let name = req.body.name;
    courseDao_1.CourseService.getBatchById(cid, bid).then((batch) => {
        studentDao_1.StudentService.addStudent(name, batch).then((student) => {
            res.status(200).json(student);
        });
    });
});
route.get('/:id', (req, res) => {
    let id = req.params.id;
    studentDao_1.StudentService.getStudentById(id).then((student) => {
        res.status(200).json(student);
    });
});
route.delete('/:id', (req, res) => {
    let id = req.params.id;
    try {
        studentDao_1.StudentService.deleteStudentById(id).then((result) => {
            if (result === 0)
                throw Error('No Student found for id ' + id);
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
    studentDao_1.StudentService.updateStudent(id, name).then((result) => {
        console.log(result);
        if (result == 0)
            throw Error("Update failed No Student found for id" + id);
        res.status(200).json(result);
    }).catch(err => {
        res.status(400).json({
            error: ""
        });
    });
});
route.get('/:id/batches', (req, res) => {
    let id = req.params.id;
    studentDao_1.StudentService.getStudentBatches(id).then((student) => {
        res.status(200).json(student);
    });
});
route.post('/:id/courses/:cid/batches/:bid', (req, res) => {
    let id = req.params.id;
    let bid = req.params.bid;
    let cid = req.params.cid;
    courseDao_1.CourseService.getBatchById(cid, bid).then((batch) => {
        studentDao_1.StudentService.getStudentById(id).then((student) => {
            studentDao_1.StudentService.addStudentToBatch(student, batch).then((result) => {
                console.log(result);
                res.json(result);
            });
        });
    });
});
exports.default = route;
