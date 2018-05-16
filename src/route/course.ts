import express, {Request, Response} from 'express'
import {CourseService} from "../dao/courseDao";
import {BatchInterface, CourseInterface} from "../model/interfaces/interface";

let route: express.Router = express.Router();

route.get('/', (req, res) => {

    CourseService.getCourses().then((courses: CourseInterface[] | null) => {
        res.status(200).send(courses);
    })
});

route.post('/', (req: Request, res: Response) => {
    let newCourse: CourseInterface = {
        id: 0,
        name: req.body.name
    }
    CourseService.addCourses(newCourse).then((course: CourseInterface | null) => {
        res.status(200).send(course);
    })
});

route.get('/:id', (req: Request, res: Response) => {

    CourseService.getCourseById(req.params.id).then((courses: CourseInterface | null) => {
        res.status(200).send(courses);
    })
});

route.get('/:id/batches', (req: Request, res: Response) => {

    CourseService.getBatches(req.params.id).then((batch: BatchInterface[] | null) => {
        res.status(200).send(batch);
    })
});

route.post('/:id/batches', (req: Request, res: Response) => {
    let newBatch: BatchInterface = {
        id: 0,
        name: req.body.name
    }
    CourseService.addBatch(req.params.id, newBatch).then((batch: BatchInterface | null) => {
        res.status(200).send(batch);
    })
});

route.get('/:id/batches/:bid', (req: Request, res: Response) => {

    CourseService.getBatchById(req.params.id, req.params.bid).then((batch: BatchInterface | null) => {
        res.status(200).send(batch);
    })
});

route.get('/:id/batches/:bid/students', (req: Request, res: Response) => {
    let cid = req.params.id;
    let bid = req.params.bid;
    CourseService.getBatchStudents(cid, bid).then((students: BatchInterface[] | null) => {
        res.status(200).send(students);
    })
});


route.get('/:id/batches/:bid/teachers', (req: Request, res: Response) => {
    let cid = req.params.id;
    let bid = req.params.bid;
    CourseService.getBatchTeachers(cid, bid).then((teachers: BatchInterface[] | null) => {
        res.status(200).send(teachers);
    })
});

route.delete('/:id', (req: Request, res: Response) => {
    let id = req.params.id;
    console.log(id);
    try {
        CourseService.deleteCourse(id).then((result: number | null) => {
            if (result === 0) throw Error('No course found for id ' + id);
            res.status(200).json({
                success: true,
                id: result
            });
        }).catch(err => {
            res.status(400).json({
                error:"could not delete course with id: " +id,
            });
        })
    } catch (err) {
        res.status(400).json({
            error:"could not delete course with id: " +id
        });
    }
})

export default route