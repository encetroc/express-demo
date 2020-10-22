const Joi = require('joi')
const express = require('express')
const cors = require('cors')

// create an express app
const app = express()

// a middleware to send and recieve json
app.use(cors())
app.use(express.json())

// our courses, can be a database
const courses = [
    {id: 1, name: 'course 1'},
    {id: 2, name: 'course 2'},
    {id: 3, name: 'course 3'},
]

//items
const items = [
    {
      label: "File",
      icon: "pi pi-fw pi-file",
      items: [
        {
          label: "New",
          icon: "pi pi-fw pi-plus",
          items: [
            {
              label: "Bookmark",
              icon: "pi pi-fw pi-bookmark"
            },
            {
              label: "Video",
              icon: "pi pi-fw pi-video"
            }
          ]
        },
        {
          label: "Delete",
          icon: "pi pi-fw pi-trash"
        },
        {
          label: "Export",
          icon: "pi pi-fw pi-external-link"
        }
      ]
    },
    {
      label: "Edit",
      icon: "pi pi-fw pi-pencil",
      items: [
        {
          label: "Left",
          icon: "pi pi-fw pi-align-left"
        },
        {
          label: "Right",
          icon: "pi pi-fw pi-align-right"
        },
        {
          label: "Center",
          icon: "pi pi-fw pi-align-center"
        },
        {
          label: "Justify",
          icon: "pi pi-fw pi-align-justify"
        }
      ]
    },
    {
      label: "Users",
      icon: "pi pi-fw pi-user",
      items: [
        {
          label: "New",
          icon: "pi pi-fw pi-user-plus"
        },
        {
          label: "Delete",
          icon: "pi pi-fw pi-user-minus"
        },
        {
          label: "Search",
          icon: "pi pi-fw pi-users",
          items: [
            {
              label: "Filter",
              icon: "pi pi-fw pi-filter",
              items: [
                {
                  label: "Print",
                  icon: "pi pi-fw pi-print"
                }
              ]
            },
            {
              icon: "pi pi-fw pi-bars",
              label: "List"
            }
          ]
        }
      ]
    },
    {
      label: "Events",
      icon: "pi pi-fw pi-calendar",
      items: [
        {
          label: "Edit",
          icon: "pi pi-fw pi-pencil",
          items: [
            {
              label: "Save",
              icon: "pi pi-fw pi-calendar-plus"
            },
            {
              label: "Delete",
              icon: "pi pi-fw pi-calendar-minus"
            }
          ]
        },
        {
          label: "Archieve",
          icon: "pi pi-fw pi-calendar-times",
          items: [
            {
              label: "Remove",
              icon: "pi pi-fw pi-calendar-minus"
            }
          ]
        }
      ]
    }
  ]

// root route
app.get('/', (req, res) => {
    res.send('hello world, dev review')
})

app.get('/api/items', (req, res) => {
    res.send(items)
})

//fetch and  get all courses
app.get('/api/courses', (req, res) => {
    // send response with all courses
    res.send(courses)
})

// create a new course
app.post('/api/courses', (req, res) => {
    // validation
    const {error} = validateCourse(req.body)
    if (error) return res.status('400').send(error.details[0].message)

    // create new course
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)

    // send response, one course
    res.send(course)
})

// feth and get one course
app.get('/api/courses/:id', (req, res) => {
    // validation
    const course = courses.find(val => val.id === parseInt(req.params.id))
    if (!course) return res.status('404').send('course not found')

    // send response, one course
    res.send(course)
})

// update an existing course
app.put('/api/courses/:id', (req, res) => {
    //validation
    const course = courses.find(val => val.id === parseInt(req.params.id))
    if (!course) return res.status('404').send('course not found')
    const {error} = validateCourse(req.body)
    if (error) return res.status('400').send(error.details[0].message)

    // update course
    course.name = req.body.name

    // send response, updated course
    res.send(course)
})

// delete an existing course
app.delete('/api/courses/:id', (req, res) => {
    // validation
    const course = courses.find(val => val.id === parseInt(req.params.id))
    if (!course) return res.status('404').send('course not found')

    // delete course
    const index = courses.indexOf(course)
    courses.splice(index, 1)

    // send response, deleted course
    res.send(course)
})

// validation function for course
function validateCourse(course) {
    const schema = {
        // course name is a string with minimum length of 3 and is required
        name: Joi.string().min(3).required()
    }

    // return validation object, contains validation errors
    return Joi.validate(course, schema)
}

// port setup and running the server
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}`))