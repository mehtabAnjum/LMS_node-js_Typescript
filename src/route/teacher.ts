import express, {Request, Response} from 'express';
import {TeacherService} from "../dao/teacherDao";
import { TeacherInterface} from "../model/interfaces/interface";

let route: express.Router = express.Router();

route.get('/', (req: Request, res: Response) => {
    TeacherService.getAllTeachers().then((teachers: TeacherInterface[] | null) => {
        res.status(200).json(teachers);
    })
})

route.post('/:sid', (req: Request, res: Response) => {
    let sId = req.params.sid;
    let newTeacher: TeacherInterface = {
        id: 0,
        name: req.body.name
    }
    TeacherService.addNewTeacher(newTeacher, sId).then((teacher: TeacherInterface | null) => {
        res.status(200).json(teacher);
    })
})


route.get('/:id', (req: Request, res: Response) => {
    let id = req.params.id;
    TeacherService.getTeacherById(id).then((teacher: TeacherInterface | null) => {
        res.status(200).json(teacher);
    })
})

route.get('/:id/batches', (req: Request, res: Response) => {
    let id = req.params.id;
    TeacherService.getTeacherBatches(id).then((batches: TeacherInterface | null) => {
        res.status(200).json(batches)
    });
})

route.delete('/:id', (req: Request, res: Response) => {
    let id = req.params.id;
    try {
        TeacherService.deleteTeacher(id).then((result: number | null) => {
            if (result === 0) throw Error('No Teacher found for id ' + id);
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
    try {
        TeacherService.updateTeacher(id, name).then((result: [number, TeacherInterface[]]) => {
            if (result[0] == 0) throw Error('No Teacher found for id ' + id);
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

export default route;