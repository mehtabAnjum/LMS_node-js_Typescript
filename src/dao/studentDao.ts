import {models} from '../model/model';
import {BatchInterface, StudentInterface} from "../model/interfaces/interface";

export class StudentService {
    public static async getStudents(): Promise<StudentInterface[] | null> {
        return await models.Student.findAll({
            include: [{
                model: models.Batch,
                attributes: ['id', 'name']
            }]
        })
    }

    public static async addStudent(name: string, batch: any): Promise<BatchInterface | StudentInterface | null> {
        return new Promise<StudentInterface | null>((resolve, reject) => {
            models.Student.create({name: name}).then(student => {
                batch.addStudent(student);
                resolve(student);
            })
        })
    }


    public static async getStudentById(id: number): Promise<StudentInterface | null> {
        return await models.Student.findById(id, {
            include: [{
                model: models.Batch,
                attributes: ['id', 'name']
            }]
        });
    }

    public static async deleteStudentById(id: number): Promise<number | null> {
        return await  models.Student.destroy({
            where: {
                id: id
            }
        });
    }

    public static async updateStudent(id: number, name: string): Promise<any | null> {
        return await models.Student.update({
            name: name
        }, {
            where: {
                id: id
            }
        });
    }

    public static async getStudentBatches(id: number): Promise<StudentInterface[] | null> {
        return await models.Student.findAll({
            where: {
                id: id
            },
            attributes: ['id', 'name'],
            include: [{
                model: models.Batch,
                attributes: ['id', 'name'],
                through: {attributes: []}
            }]
        })
    }

    public static async addStudentToBatch(stu: any, batch: any): Promise<BatchInterface | StudentInterface | null> {
        return await batch.addStudent(stu);
    }
}