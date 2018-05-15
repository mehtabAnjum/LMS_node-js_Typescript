import { SubjectInterface } from "../model/interfaces/interface";
export declare class SubjectService {
    static getAllSubjects(): Promise<SubjectInterface[] | null>;
    static getSubjectById(id: number): Promise<SubjectInterface | null>;
    static deleteSubject(id: number): Promise<number | null>;
    static updateSubject(id: number, name: string): Promise<any | null>;
    static getTeachersBySubject(id: number): Promise<SubjectInterface | null>;
    static addNewSubject(courseId: number, name: string): Promise<SubjectInterface | null>;
}
