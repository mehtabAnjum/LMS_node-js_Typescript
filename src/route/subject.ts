import express, {Request, Response} from 'express';
import {SubjectService} from "../dao/subjectDao";
import {SubjectInterface} from "../model/interfaces/interface";

let route: express.Router = express.Router();

route.get('/', (req: Request, res: Response) => {
    SubjectService.getAllSubjects().then((subjects: SubjectInterface[] | null) => {
        res.status(200).json(subjects);
    })
})

route.post('/courses/:cid', (req: Request, res: Response) => {
    let cid = req.params.cid;
    let name = req.body.name;
    SubjectService.addNewSubject(cid, name).then((subject: SubjectInterface | null) => {
        res.status(200).json(subject);
    })
})


route.get('/:id', (req: Request, res: Response) => {
    let id = req.params.id;
    SubjectService.getSubjectById(id).then((subjects: SubjectInterface | null) => {
        res.status(200).json(subjects);
    })
})

route.get('/:id/teachers',(req: Request, res: Response) => {
    let id = req.params.id;
    SubjectService.getTeachersBySubject(id).then((teachers: SubjectInterface | null) =>{
        res.status(200).json(teachers);
    })
})

route.delete('/:id', (req: Request, res: Response) => {
    let id = req.params.id;
    try {
        SubjectService.deleteSubject(id).then((result: number | null) => {
            if (result === 0) throw Error('No Subject found for id ' + id);
            res.status(200).json({
                success: true,
                id: result
            });
        }).catch(err => {
            res.status(400).json({
                error:"could not delete subject with id: " +id,
            });
        })
    } catch (err) {
        res.status(400).json({
            error:"could not delete subject with id: " +id
        });
    }
})


route.put('/:id', (req: Request, res: Response) => {

    let id = req.params.id;
    let name = req.body.name;
    try {
        SubjectService.updateSubject(id, name).then((result: [number, SubjectInterface[]]) => {
            if (result[0] == 0) throw Error('No Subject found for id ' + id);
            res.status(200).json({
                success: true,
                id: result
            });
        }).catch(err => {
            res.status(400).json({
                error:"Could not update subject",
            });
        })
    } catch (err) {
        res.status(400).json({
            error:"Could not update subject"
        });
    }
})

export default route;