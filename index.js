const express = require('express')
const app = express()

app.use(express.json())

const courses = [
    {id: 1, name: 'course 1'},
    {id: 2, name: 'course 2'},
    {id: 3, name: 'course 3'},
]

app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

app.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(val => val.id === parseInt(req.params.id))
    if (!course) res.status('404').send('course not found')
    res.send(course)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}`))