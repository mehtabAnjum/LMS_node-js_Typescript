import {models} from '../model/model'
import {BatchInterface, CourseInterface} from "../model/interfaces/interface";


export class CourseService {
    public static async getCourses(): Promise<CourseInterface[] | null> {
        return await models.Course.findAll({
            include: [{
                model: models.Batch,
                attributes: ['id', 'name'],
            },
                {
                    model: models.Subject,
                    attributes: ['id', 'name'],
                }]
        })
    }

    public static async getBatches(id: number): Promise<BatchInterface[] | null> {
        return await models.Batch.findAll({
            include: [{
                model: models.Course,
                where: {
                    id: id
                },
                attributes: ['id', 'name'],
            }]
        })
    }

    public static async getBatchById(id: number, bid: number): Promise<BatchInterface | null> {
        return await models.Batch.findOne({
            where: {
                id: bid
            },
            include: [{
                model: models.Course,
                where: {
                    id: id
                },
                attributes: ['id', 'name'],
            }]
        })
    }

    public static async getCourseById(id: number): Promise<CourseInterface | null> {
        console.log(id);
        return await models.Course.findById(id)
    }


    public static async addCourses(newCourse: CourseInterface): Promise<CourseInterface | null> {
        return await models.Course.create({
            name: newCourse.name
        })
    }

    public static async addBatch(batchId: number, newBatch: BatchInterface): Promise<BatchInterface | null> {
        return new Promise<BatchInterface | null>((resolve, reject) => {
            models.Batch.create({
                name: newBatch.name
            }).then((batch: BatchInterface) => {
                this.getCourseById(batchId).then((course: any) => {
                    course.addBatch(batch)
                    resolve(batch)
                })
            })
        })
    }

    public static async getBatchStudents(cid: number, bid: number): Promise<BatchInterface[] | null> {
        return await models.Batch.findAll({
            where: {
                id: bid
            },
            attributes: [],
            include: [{
                model: models.Course,
                where: {
                    id: cid
                },
                attributes: []
            }, {
                model: models.Student,
                attributes: ['id', 'name']
            }]
        })
    }

    public static async getBatchTeachers(cid: number, bid: number): Promise<BatchInterface[] | null> {
        return await models.Batch.findAll({
            where: {
                id: bid
            },
            attributes: [],
            include: [{
                model: models.Course,
                where: {
                    id: cid
                },
                attributes: []
            }, {
                model: models.Teacher,
                attributes: ['id', 'name']
            }]
        })
    }

}

