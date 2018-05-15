import {models} from '../model/model';
import {TeacherInterface} from "../model/interfaces/interface";
import {SubjectService} from "./subjectDao";


export class TeacherService {

    public static addNewTeacher(newTeacher:TeacherInterface,subjectId:number):Promise<TeacherInterface | null> {
        return new Promise<TeacherInterface|null>((resolve,reject)=> {
            console.log("this iiii  " +subjectId);
            models.Teacher.create({
                name: newTeacher.name
            }).then((teacher:any)=>{
                SubjectService.getSubjectById(subjectId).then((subject:any)=>{
                    subject.addTeacher(teacher);
                    resolve(subject);
                })
            })
        })
    }

    public static async getAllTeachers(): Promise<TeacherInterface[] | null> {
        return await models.Teacher.findAll({
            include:[{
                model:models.Subject
            }]
        });
    }

    public static async getTeacherById(id: number): Promise<TeacherInterface | null> {
        return await models.Teacher.findById(id,{
            include:[{
                model:models.Subject
            }]
        });
    }

    public static async getTeacherBatches(id: number):Promise<TeacherInterface | null>{
        return await models.Teacher.findById(id,{
            include:[{
                model:models.Batch
            }]
        });
    }

    public static async deleteTeacher(id: number): Promise<number | null> {
        return await models.Teacher.destroy({
            where: {
                id: id
            }
        })
    }

    public static async updateTeacher(id: number, name: string): Promise<any | null> {
        return await models.Teacher.update({name: name}, {
            where: {
                id: id
            }
        })
    }

}