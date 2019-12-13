const express = require('express');
const Joi = require('joi');
//const bodyParser = require('body-parser');
const app = express();

app.use(express.json());

const courses = [
   { id:1, name: 'Course 1'},
   { id:2, name: 'Course 2'},
   { id:3, name: 'Course 3'},
   { id:4, name: 'Course 4'},
   { id:5, name: 'Course 5'},
   { id:6, name: 'Course 6'}

];


app.get('/', (req,res) => {
    res.send("Hello World");
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {
    
    const { error } = validateCourse(req.body);

    if(error)
    {
        res.status(400).send(error.details[0].message);
        return;

    }
    const course = {
        id: courses.length+1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);

});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with given ID was not found');    
    res.send(course);
});

app.get('/api/post/:year/:month', (req, res) => {
    res.send(req.params)
});

app.put('/api/courses/:id', (req, res) => 
{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(400).send('The course with given ID was not found');

    const { error } = validateCourse(req.body);

    if(error)
    {
        res.status(400).send(error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);

});

function validateCourse(course)
{
    const schema =
    {
        name: Joi.string().min(6).required()
    };

    return Joi.validate(course, schema);
}

app.listen(4060, () => console.log("Listening on Port 4060...."));
