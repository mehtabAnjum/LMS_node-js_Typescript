"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const student_1 = __importDefault(require("./route/student"));
const course_1 = __importDefault(require("./route/course"));
const subject_1 = __importDefault(require("./route/subject"));
const teacher_1 = __importDefault(require("./route/teacher"));
const config_1 = require("./db/config");
const cors = require('cors');
const app = express_1.default();
app.use(cors());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use(express_session_1.default({
    secret: 'lkskjdfisdjfifjj7&8a8w8ee8909kajsd98989898991alskd',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true
}));
app.use('/', express_1.default.static(path_1.default.join(__dirname, '../public')));
app.get("/", (req, res) => {
    res.sendFile('index.html');
});
app.use('/courses', course_1.default);
app.use('/students', student_1.default);
app.use('/subjects', subject_1.default);
app.use('/teachers', teacher_1.default);
// app.listen(1234, () => {
//     console.log("Server started @ 1234");
// })
app.listen(process.env.PORT || 5555, () => {
    config_1.db.sync();
    console.log("started");
});
