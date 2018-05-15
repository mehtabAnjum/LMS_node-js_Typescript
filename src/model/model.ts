import Sequelize from 'sequelize';
import {DataTypeAbstract, DefineAttributeColumnOptions} from "sequelize";
import {
    BatchInterface,
    CourseInterface,
    LectureInterface,
    SubjectInterface,
    StudentInterface,
    TeacherInterface
} from './interfaces/interface'

import {db} from "../db/config";

declare global {
    type SequelizeAttributes<T extends { [key: string]: any }> = {
        [P in keyof T]: string | DataTypeAbstract | DefineAttributeColumnOptions;
    };
}

const batchAttr: SequelizeAttributes<BatchInterface> = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
};
const Batch = db.define<BatchInterface, any>('Batch', batchAttr);


const courseAttr: SequelizeAttributes<CourseInterface> = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
};
const Course = db.define<CourseInterface, any>('Course', courseAttr);


const lectureAttr: SequelizeAttributes<LectureInterface> = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
};
const Lecture = db.define<LectureInterface, any>('lecture', lectureAttr);


const studentAttr: SequelizeAttributes<StudentInterface> = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
};
const Student = db.define<StudentInterface, any>('student', studentAttr);


const teacherAttr: SequelizeAttributes<LectureInterface> = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
};
const Teacher = db.define<TeacherInterface, any>('teacher', teacherAttr);


const subjectAttr: SequelizeAttributes<SubjectInterface> = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
};
const Subject = db.define<LectureInterface, any>('subject', subjectAttr);

Course.belongsToMany(Subject, {through: 'course_subject', onDelete: 'cascade'});
Subject.belongsToMany(Course, {through: 'course_subject', onDelete: 'cascade'});


Course.hasMany(Batch);
Batch.belongsTo(Course);

Batch.hasMany(Lecture);
Lecture.belongsTo(Batch);

Subject.hasMany(Teacher);
Teacher.belongsTo(Subject);

Lecture.belongsTo(Subject, {as: 'subject'});
Lecture.belongsTo(Teacher, {as: 'teacher'});

Student.belongsToMany(Batch, {through: 'student_batch', onDelete: 'cascade', hooks: true});
Batch.belongsToMany(Student, {through: 'student_batch', onDelete: 'cascade', hooks: true});

(async function () {
    try {
        await db.authenticate()
        await db.sync({alter: false})
            .then(() => {
                console.log("Database Synchronised");
            })
            .catch((err) => {
                console.log("Error setting up Database");
                console.error(err);
            });
    }
    catch (e) {
        console.log(e)
    }
})()

export const models = {
    Batch, Course, Student, Subject, Teacher, Lecture
}

export {db}

