import { BatchInterface, StudentInterface } from "../model/interfaces/interface";
export declare class StudentService {
    static getStudents(): Promise<StudentInterface[] | null>;
    static addStudent(name: string, batch: any): Promise<BatchInterface | StudentInterface | null>;
    static getStudentById(id: number): Promise<StudentInterface | null>;
    static deleteStudentById(id: number): Promise<number | null>;
    static updateStudent(id: number, name: string): Promise<any | null>;
    static getStudentBatches(id: number): Promise<StudentInterface[] | null>;
    static addStudentToBatch(stu: any, batch: any): Promise<BatchInterface | StudentInterface | null>;
}
