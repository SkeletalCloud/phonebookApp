// console.log("hello world")

// const http = require('http')

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'text/plain' })
//   response.end('Hello World')
// })

// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)

// const http = require('http')
// let notes = [
//   {
//     id: "1",
//     content: "HTML is easy",
//     important: true
//   },
//   {
//     id: "2",
//     content: "Browser can execute only JavaScript",
//     important: false
//   },
//   {
//     id: "3",
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true
//   }
// ]
// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify(notes))
// })

// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)




// const express = require('express')
// const app = express()
// app.use(express.json())


// let notes = [
//   {
//     id: "1",
//     content: "HTML is easy",
//     important: true
//   },
//   {
//     id: "2",
//     content: "Browser can execute only JavaScript",
//     important: false
//   },
//   {
//     id: "3",
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true
//   }
// ]

// app.get('/', (request, response) => {
//   response.send('<h1>Hello World!</h1>')
// })

// app.get('/api/notes', (request, response) => {
//   response.json(notes)
// })

// app.get('/api/notes/:id', (request, response) => {
//   const id = request.params.id
//   const note = notes.find(note => note.id === id)
// //   response.json(note)
//  if (note) {
//     response.json(note)
//   } else {
//     response.status(404).end()
//   }
// })

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }

// app.use(unknownEndpoint)

// app.post('/api/notes', (request, response) => {
//   const note = request.body
//   console.log(note)
//   response.json(note)
// })

// const generateId = () => {
//   const maxId = notes.length > 0
//     ? Math.max(...notes.map(n => Number(n.id)))
//     : 0
//   return String(maxId + 1)
// }

// app.post('/api/notes', (request, response) => {
//   const body = request.body

//   if (!body.content) {
//     return response.status(400).json({ 
//       error: 'content missing' 
//     })
//   }

//   const note = {
//     content: body.content,
//     important: body.important || false,
//     id: generateId(),
//   }

//   notes = notes.concat(note)

//   response.json(note)
// })

// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }

// app.use(requestLogger)

// app.delete('/api/notes/:id', (request, response) => {
//   const id = request.params.id
//   notes = notes.filter(note => note.id !== id)
//   response.status(204).end()
// })

// const PORT = 3001
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })






// Exercises 3.1.-3.6.
// NB: Since this is not about the frontend and React, the application is not created with Vite, but with the npm init command, as described earlier in this part of the material.

// Do not add the node_modules directory to version control. The npm init command does not automatically create a .gitignore file, so create one in the root of your project and add the line node_modules to it. This way Git will no longer track that directory in version control.

// Strong recommendation: When you are working on backend code, always keep an eye on what's going on in the terminal that is running your application.

// 3.1: Phonebook backend step 1
// Implement a Node application that returns a hardcoded list of phonebook entries from the address http://localhost:3001/api/persons.

// Data:

// [
//     { 
//       "id": "1",
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": "2",
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": "3",
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": "4",
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]copy
// Output in the browser after GET request:

// JSON data of 4 people in browser from api/persons
// Notice that the forward slash in the route api/persons is not a special character, and is just like any other character in the string.

// The application must be started with the command npm start.

// The application must also offer an npm run dev command that will run the application and restart the server whenever changes are made and saved to a file in the source code.

// 3.2: Phonebook backend step 2
// Implement a page at the address http://localhost:3001/info that looks roughly like this:

// Screenshot for 3.2
// The page has to show the time that the request was received and how many entries are in the phonebook at the time of processing the request.

// 3.3: Phonebook backend step 3
// Implement the functionality for displaying the information for a single phonebook entry. The url for getting the data for a person with the id 5 should be http://localhost:3001/api/persons/5

// If an entry for the given id is not found, the server has to respond with the appropriate status code.

// 3.4: Phonebook backend step 4
// Implement functionality that makes it possible to delete a single phonebook entry by making an HTTP DELETE request to the unique URL of that phonebook entry.

// Test that your functionality works with either Postman or the Visual Studio Code REST client.

// 3.5: Phonebook backend step 5
// Expand the backend so that new phonebook entries can be added by making HTTP POST requests to the address http://localhost:3001/api/persons.

// Generate a new id for the phonebook entry with the Math.random function. Use a big enough range for your random values so that the likelihood of creating duplicate ids is small.

// 3.6: Phonebook backend step 6
// Implement error handling for creating new entries. The request is not allowed to succeed, if:

// The name or number is missing
// The name already exists in the phonebook
// Respond to requests like these with the appropriate status code, and also send back information that explains the reason for the error, e.g.:

// { error: 'name must be unique' }





// Exercises 3.7.-3.8.
// 3.7: Phonebook backend step 7
// Add the morgan middleware to your application for logging. Configure it to log messages to your console based on the tiny configuration.

// The documentation for Morgan is not the best, and you may have to spend some time figuring out how to configure it correctly. However, most documentation in the world falls under the same category, so it's good to learn to decipher and interpret cryptic documentation in any case.

// Morgan is installed just like all other libraries with the npm install command. Taking morgan into use happens the same way as configuring any other middleware by using the app.use command.

// 3.8*: Phonebook backend step 8
// Configure morgan so that it also shows the data sent in HTTP POST requests:

// terminal showing post data being sent
// Note that logging data even in the console can be dangerous since it can contain sensitive data and may violate local privacy law (e.g. GDPR in EU) or business-standard. In this exercise, you don't have to worry about privacy issues, but in practice, try not to log any sensitive data.

// This exercise can be quite challenging, even though the solution does not require a lot of code.

// This exercise can be completed in a few different ways. One of the possible solutions utilizes these two techniques:

// creating new tokens
// JSON.stringify


const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())

 let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response)=>{
  response.send('Welcome to our contact page')
})

app.get('/api/persons', (request, response)=>{
   response.json(persons)
})


app.get('/info', (request, response) => {
  const date = new Date()

  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
  `)
})

app.get('/api/persons/:id', (request, response)=>{
  const id = request.params.id
  const phonebook = persons.find(person => person.id === id)

  if(phonebook){
    response.json(phonebook)
  }else {
    response.status(404).end()
  }
})

const generatedId = ()=>{
  const maxId = persons.length > 0 ? Math.max(...persons.map(n => Number(n.id))) : 0
  return String(maxId + 1)
}

app.post('/api/persons', (request, response)=>{
    const body = request.body

    if(!body.name || !body.number){
      response.status(400).json({
        "error" : "Name or Number is missing!!!"
      })
    }

  

   const person = {
     'id' : generatedId(),
     'name' : body.name,
     'number' : body.number
   }

   const checkdetail = persons.find(p => p.name === person.name)

   if(checkdetail){
    response.status(400).json({
       'error' : 'The name already exists in the phonebook'
    }
    )
   }
   else {
   persons = persons.concat(person)
   response.status(201).json(person)
   }
   
})

app.delete('/api/persons/:id', (request, response)=>{
   const id = request.params.id
   persons = persons.filter(person => person.id !== id)
  //  response.status(204).end()
  response.send(persons)
})

const PORT = 3001
app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})
