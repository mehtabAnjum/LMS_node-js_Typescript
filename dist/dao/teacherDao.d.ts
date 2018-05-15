import { TeacherInterface } from "../model/interfaces/interface";
export declare class TeacherService {
    static addNewTeacher(newTeacher: TeacherInterface, subjectId: number): Promise<TeacherInterface | null>;
    static getAllTeachers(): Promise<TeacherInterface[] | null>;
    static getTeacherById(id: number): Promise<TeacherInterface | null>;
    static getTeacherBatches(id: number): Promise<TeacherInterface | null>;
    static deleteTeacher(id: number): Promise<number | null>;
    static updateTeacher(id: number, name: string): Promise<any | null>;
}
