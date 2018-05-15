import {models} from '../model/model';
import {SubjectInterface} from "../model/interfaces/interface";
import {CourseService} from "./courseDao";


export class SubjectService {
    public static async getAllSubjects(): Promise<SubjectInterface[] | null> {
        return await  models.Subject.findAll({
            attributes: ['id', 'name']
        });
    }

    public static async getSubjectById(id: number): Promise<SubjectInterface | null> {
        return await models.Subject.findById(id, {
            attributes: ['id', 'name']
        })
    }

    public static async deleteSubject(id: number): Promise<number | null> {
        return await models.Subject.destroy({
            where: {
                id: id
            }
        })
    }

    public static async updateSubject(id: number, name: string): Promise<any | null> {
        return await models.Subject.update({name: name}, {
            where: {
                id: id
            }
        })
    }

    public static async getTeachersBySubject(id: number): Promise<SubjectInterface | null> {
        return await models.Subject.findById(id, {
            attributes: [],
            include:[{
                model:models.Teacher
            }]
        })
    }

    public static addNewSubject(courseId: number, name: string): Promise<SubjectInterface | null> {
        return new Promise<SubjectInterface | null>((resolve, reject) => {
            models.Subject.create({
                name: name
            }).then((subject: any) => {
                CourseService.getCourseById(courseId).then((course: any) => {
                    course.addSubject(subject);
                    resolve(subject)
                })
            })
        })
    }
}