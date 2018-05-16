"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../model/model");
class CourseService {
    static getCourses() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("course dao me aagaya");
            return yield model_1.models.Course.findAll({
                include: [{
                        model: model_1.models.Batch,
                        attributes: ['id', 'name'],
                    },
                    {
                        model: model_1.models.Subject,
                        attributes: ['id', 'name'],
                    }]
            });
        });
    }
    static deleteCourse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.models.Course.destroy({
                where: {
                    id: id
                }
            });
        });
    }
    static getBatches(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.models.Batch.findAll({
                include: [{
                        model: model_1.models.Course,
                        where: {
                            id: id
                        },
                        attributes: ['id', 'name'],
                    }]
            });
        });
    }
    static getBatchById(id, bid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.models.Batch.findOne({
                where: {
                    id: bid
                },
                include: [{
                        model: model_1.models.Course,
                        where: {
                            id: id
                        },
                        attributes: ['id', 'name'],
                    }]
            });
        });
    }
    static getCourseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(id);
            return yield model_1.models.Course.findById(id);
        });
    }
    static addCourses(newCourse) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.models.Course.create({
                name: newCourse.name
            });
        });
    }
    static addBatch(batchId, newBatch) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                model_1.models.Batch.create({
                    name: newBatch.name
                }).then((batch) => {
                    this.getCourseById(batchId).then((course) => {
                        course.addBatch(batch);
                        resolve(batch);
                    });
                });
            });
        });
    }
    static getBatchStudents(cid, bid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.models.Batch.findAll({
                where: {
                    id: bid
                },
                attributes: [],
                include: [{
                        model: model_1.models.Course,
                        where: {
                            id: cid
                        },
                        attributes: []
                    }, {
                        model: model_1.models.Student,
                        attributes: ['id', 'name']
                    }]
            });
        });
    }
    static getBatchTeachers(cid, bid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.models.Batch.findAll({
                where: {
                    id: bid
                },
                attributes: [],
                include: [{
                        model: model_1.models.Course,
                        where: {
                            id: cid
                        },
                        attributes: []
                    }, {
                        model: model_1.models.Teacher,
                        attributes: ['id', 'name']
                    }]
            });
        });
    }
}
exports.CourseService = CourseService;
