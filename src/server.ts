import express from "express";
import session from "express-session";
import path from "path"

import {Request, Response} from 'express'
import studentRoute from "./route/student";
import cbRoute from "./route/course";
import subjectRoute from "./route/subject";
import teacherRoute from "./route/teacher";

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'lkskjdfisdjfifjj7&8a8w8ee8909kajsd98989898991alskd',
    cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: true
}))


app.use('/', express.static(path.join(__dirname, '../public')));

app.get("/", (req: Request, res: Response) => {
    res.sendFile('index.html');
});

app.use('/courses', cbRoute);
app.use('/students', studentRoute);
app.use('/subjects', subjectRoute);
app.use('/teachers', teacherRoute);

app.listen(1234, () => {
    console.log("Server started @ 1234");
})