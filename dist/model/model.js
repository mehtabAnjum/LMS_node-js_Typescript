"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const config_1 = require("../db/config");
exports.db = config_1.db;
const batchAttr = {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: sequelize_1.default.STRING,
};
const Batch = config_1.db.define('Batch', batchAttr);
const courseAttr = {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: sequelize_1.default.STRING,
};
const Course = config_1.db.define('Course', courseAttr);
const lectureAttr = {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: sequelize_1.default.STRING,
};
const Lecture = config_1.db.define('lecture', lectureAttr);
const studentAttr = {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: sequelize_1.default.STRING,
};
const Student = config_1.db.define('student', studentAttr);
const teacherAttr = {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: sequelize_1.default.STRING,
};
const Teacher = config_1.db.define('teacher', teacherAttr);
const subjectAttr = {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: sequelize_1.default.STRING,
};
const Subject = config_1.db.define('subject', subjectAttr);
Course.belongsToMany(Subject, { through: 'course_subject', onDelete: 'cascade' });
Subject.belongsToMany(Course, { through: 'course_subject', onDelete: 'cascade' });
Course.hasMany(Batch);
Batch.belongsTo(Course);
Batch.hasMany(Lecture);
Lecture.belongsTo(Batch);
Subject.hasMany(Teacher);
Teacher.belongsTo(Subject);
Lecture.belongsTo(Subject, { as: 'subject' });
Lecture.belongsTo(Teacher, { as: 'teacher' });
Student.belongsToMany(Batch, { through: 'student_batch', onDelete: 'cascade', hooks: true });
Batch.belongsToMany(Student, { through: 'student_batch', onDelete: 'cascade', hooks: true });
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield config_1.db.authenticate();
            yield config_1.db.sync({ alter: false })
                .then(() => {
                console.log("Database Synchronised");
            })
                .catch((err) => {
                console.log("Error setting up Database");
                console.error(err);
            });
        }
        catch (e) {
            console.log(e);
        }
    });
})();
exports.models = {
    Batch, Course, Student, Subject, Teacher, Lecture
};
