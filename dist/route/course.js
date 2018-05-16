"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courseDao_1 = require("../dao/courseDao");
let route = express_1.default.Router();
route.get('/', (req, res) => {
    courseDao_1.CourseService.getCourses().then((courses) => {
        res.status(200).send(courses);
    });
});
route.post('/', (req, res) => {
    let newCourse = {
        id: 0,
        name: req.body.name
    };
    courseDao_1.CourseService.addCourses(newCourse).then((course) => {
        res.status(200).send(course);
    });
});
route.get('/:id', (req, res) => {
    courseDao_1.CourseService.getCourseById(req.params.id).then((courses) => {
        res.status(200).send(courses);
    });
});
route.get('/:id/batches', (req, res) => {
    courseDao_1.CourseService.getBatches(req.params.id).then((batch) => {
        res.status(200).send(batch);
    });
});
route.post('/:id/batches', (req, res) => {
    let newBatch = {
        id: 0,
        name: req.body.name
    };
    courseDao_1.CourseService.addBatch(req.params.id, newBatch).then((batch) => {
        res.status(200).send(batch);
    });
});
route.get('/:id/batches/:bid', (req, res) => {
    courseDao_1.CourseService.getBatchById(req.params.id, req.params.bid).then((batch) => {
        res.status(200).send(batch);
    });
});
route.get('/:id/batches/:bid/students', (req, res) => {
    let cid = req.params.id;
    let bid = req.params.bid;
    courseDao_1.CourseService.getBatchStudents(cid, bid).then((students) => {
        res.status(200).send(students);
    });
});
route.get('/:id/batches/:bid/teachers', (req, res) => {
    let cid = req.params.id;
    let bid = req.params.bid;
    courseDao_1.CourseService.getBatchTeachers(cid, bid).then((teachers) => {
        res.status(200).send(teachers);
    });
});
route.delete('/:id', (req, res) => {
    let id = req.params.id;
    console.log(id);
    try {
        courseDao_1.CourseService.deleteCourse(id).then((result) => {
            if (result === 0)
                throw Error('No course found for id ' + id);
            res.status(200).json({
                success: true,
                id: result
            });
        }).catch(err => {
            res.status(400).json({
                error: "could not delete course with id: " + id,
            });
        });
    }
    catch (err) {
        res.status(400).json({
            error: "could not delete course with id: " + id
        });
    }
});
exports.default = route;
