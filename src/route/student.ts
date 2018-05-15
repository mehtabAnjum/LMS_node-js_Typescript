import express, {Request, Response} from 'express';

import {StudentService} from "../dao/studentDao";
import {CourseService} from "../dao/courseDao";


import {BatchInterface, StudentInterface} from "../model/interfaces/interface";

let route: express.Router = express.Router();

route.get('/', (req: Request, res: Response) => {
    StudentService.getStudents().then((students: StudentInterface[] | null) => {
        res.status(200).json(students);
    })
})


route.post('/', (req: Request, res: Response) => {
    let cid = req.body.cid;
    let bid = req.body.bid;
    let name = req.body.name;

    CourseService.getBatchById(cid, bid).then((batch: BatchInterface | null) => {
        StudentService.addStudent(name, batch).then((student: StudentInterface | null) => {
            res.status(200).json(student);
        })
    })

})

route.get('/:id', (req: Request, res: Response) => {
    let id = req.params.id;
    StudentService.getStudentById(id).then((student: StudentInterface | null) => {
        res.status(200).json(student);
    })
})


route.delete('/:id', (req: Request, res: Response) => {
    let id = req.params.id;
    try {
        StudentService.deleteStudentById(id).then((result: number | null) => {
            if (result === 0) throw Error('No Student found for id ' + id);
            res.status(200).json({
                success: true,
                id: result
            });
        }).catch(err => {
            res.status(400).json({
                error: ""
            });
        })
    } catch (err) {
        res.status(400).json({
            error: ""
        });
    }
})

route.put('/:id', (req: Request, res: Response) => {
    let id = req.params.id;
    let name = req.body.name;

    StudentService.updateStudent(id, name).then((result) => {
        console.log(result)
        if (result == 0)
            throw Error("Update failed No Student found for id" + id);
        res.status(200).json(result);
    }).catch(err => {
        res.status(400).json({
            error: ""
        });
    })

})


route.get('/:id/batches', (req: Request, res: Response) => {
    let id = req.params.id;
    StudentService.getStudentBatches(id).then((student: StudentInterface[] | null) => {
        res.status(200).json(student);
    })
})


route.post('/:id/courses/:cid/batches/:bid', (req: Request, res: Response) => {
    let id = req.params.id;
    let bid = req.params.bid;
    let cid = req.params.cid;

    CourseService.getBatchById(cid, bid).then((batch: BatchInterface | null) => {
        StudentService.getStudentById(id).then((student: StudentInterface | null) => {
            StudentService.addStudentToBatch(student, batch).then((result: any) => {
                console.log(result)
                res.json(result);
            })
        })
    })

})

export default route