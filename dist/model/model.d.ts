/// <reference types="sequelize" />
import Sequelize from 'sequelize';
import { DataTypeAbstract, DefineAttributeColumnOptions } from "sequelize";
import { BatchInterface, CourseInterface, LectureInterface, StudentInterface, TeacherInterface } from './interfaces/interface';
import { db } from "../db/config";
declare global  {
    type SequelizeAttributes<T extends {
        [key: string]: any;
    }> = {
        [P in keyof T]: string | DataTypeAbstract | DefineAttributeColumnOptions;
    };
}
export declare const models: {
    Batch: Sequelize.Model<BatchInterface, any>;
    Course: Sequelize.Model<CourseInterface, any>;
    Student: Sequelize.Model<StudentInterface, any>;
    Subject: Sequelize.Model<LectureInterface, any>;
    Teacher: Sequelize.Model<TeacherInterface, any>;
    Lecture: Sequelize.Model<LectureInterface, any>;
};
export { db };
