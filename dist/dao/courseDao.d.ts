import { BatchInterface, CourseInterface } from "../model/interfaces/interface";
export declare class CourseService {
    static getCourses(): Promise<CourseInterface[] | null>;
    static deleteCourse(id: number): Promise<number | null>;
    static getBatches(id: number): Promise<BatchInterface[] | null>;
    static getBatchById(id: number, bid: number): Promise<BatchInterface | null>;
    static getCourseById(id: number): Promise<CourseInterface | null>;
    static addCourses(newCourse: CourseInterface): Promise<CourseInterface | null>;
    static addBatch(batchId: number, newBatch: BatchInterface): Promise<BatchInterface | null>;
    static getBatchStudents(cid: number, bid: number): Promise<BatchInterface[] | null>;
    static getBatchTeachers(cid: number, bid: number): Promise<BatchInterface[] | null>;
}
