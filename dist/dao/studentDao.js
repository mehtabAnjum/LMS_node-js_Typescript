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
class StudentService {
    static getStudents() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.models.Student.findAll({
                include: [{
                        model: model_1.models.Batch,
                        attributes: ['id', 'name']
                    }]
            });
        });
    }
    static addStudent(name, batch) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                model_1.models.Student.create({ name: name }).then(student => {
                    batch.addStudent(student);
                    resolve(student);
                });
            });
        });
    }
    static getStudentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.models.Student.findById(id, {
                include: [{
                        model: model_1.models.Batch,
                        attributes: ['id', 'name']
                    }]
            });
        });
    }
    static deleteStudentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.models.Student.destroy({
                where: {
                    id: id
                }
            });
        });
    }
    static updateStudent(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.models.Student.update({
                name: name
            }, {
                where: {
                    id: id
                }
            });
        });
    }
    static getStudentBatches(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.models.Student.findAll({
                where: {
                    id: id
                },
                attributes: ['id', 'name'],
                include: [{
                        model: model_1.models.Batch,
                        attributes: ['id', 'name'],
                        through: { attributes: [] }
                    }]
            });
        });
    }
    static addStudentToBatch(stu, batch) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield batch.addStudent(stu);
        });
    }
}
exports.StudentService = StudentService;
