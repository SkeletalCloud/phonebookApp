
const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.json())

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
     return response.status(400).json({
        error : "Name or Number is missing!!!"
      })
    }

  

   const person = {
     'id' : generatedId(),
     'name' : body.name,
     'number' : body.number
   }

   const checkdetail = persons.find(p => p.name === person.name)

   if(checkdetail){
    return response.status(400).json({
       error : 'The name already exists in the phonebook'
    }
    )
   }
   else {
   persons = persons.concat(person)
   return response.status(201).json(person)
   }
   
})

app.delete('/api/persons/:id', (request, response)=>{
   const id = request.params.id
   persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

// const PORT = 3001
// app.listen(PORT, ()=>{
//   console.log(`Server running on port ${PORT}`)
// })

module.exports = app
