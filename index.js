
const express = require('express')
const app = express()
const path = require('path')
const Person = require('./models/mongo')

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.json())

//  let persons = [
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
// ]


app.get('/api/persons', (request, response, next) => {
  //  response.json(persons)
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(error => next(error))
})


app.get('/info', (request, response) => {
  const date = new Date()

  // response.send(`
  //   <p>Phonebook has info for ${persons.length} people</p>
  //   <p>${date}</p>
  // `)

  Person.countDocuments({})
    .then((count) => {
      response.send( `<p>Phonebook has info for ${count.length} people</p>
    <p>${date}</p>
    `)
    })
})

app.get('/api/persons/:id', (request, response,next) => {
  // const id = request.params.id
  // const phonebook = persons.find(person => person.id === id)

  // if(phonebook){
  //   response.json(phonebook)
  // }else {
  //   response.status(404).end()
  // }

  Person.findById(request.params.id)
    .then(person => {
      if(person){
        return response.json(person)
      }else{
        return response.status(404).end()
      }
    })
    .catch(err => next(err))
})

// const generatedId = ()=>{
//   const maxId = persons.length > 0 ? Math.max(...persons.map(n => Number(n.id))) : 0
//   return String(maxId + 1)
// }

app.post('/api/persons', (request, response, next) => {
  //   const body = request.body

  //   if(!body.name || !body.number){
  //    return response.status(400).json({
  //       error : "Name or Number is missing!!!"
  //     })
  //   }

  //  const person = {
  //    'id' : generatedId(),
  //    'name' : body.name,
  //    'number' : body.number
  //  }

  //  const checkdetail = persons.find(p => p.name === person.name)

  //  if(checkdetail){
  //   return response.status(400).json({
  //      error : 'The name already exists in the phonebook'
  //   }
  //   )
  //  }
  //  else {
  //  persons = persons.concat(person)
  //  return response.status(201).json(person)
  //  }

  const { name, number } = request.body

  if (!name.content || !number.content) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name : name,
    number: number
  })

  person.save().then(savedPerson => response.json(savedPerson))
    .catch(err => next(err))

  return response.status(201).send('Phonebook successfully created')

})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(request.params.id, { name, number }, { new: true, runValidators: true })
    .then(updatedPerson => {
      if(updatedPerson){
        response.json(updatedPerson)
      }else {
        response.status(404).end()
      }
    })
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (request, response, next) => {
  //  const id = request.params.id
  //  persons = persons.filter(person => person.id !== id)
  //   response.status(204).end()

  Person.findByIdAndDelete(request.params.id)
    .then(() => {response.status(204).end()})
    .catch(err => next(err))
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError'){
    return response.status(400).send({ error : 'malformatted id' })
  }else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

module.exports = app
