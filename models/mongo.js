
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

// if(process.argv.length < 3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]
const password = process.env.MONGODB_PASSWORD

const url = `mongodb+srv://begood1345_db_user:${password}@cluster0.idxtj6w.mongodb.net/?appName=Cluster0`


mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  // name: String,
  // number: String,
  name: {
    type: String,
    minLength: 5,
    require :true
  },
  number : {
    type: String,
    require: true,
    minlength: 8,
    validate: {
      validator: function(value) {
        return /^\d{2,3}-\d+$/.test(value)
      },
      message: props => `${props.value} is not a valid phone number`
    }
  }
})

const Person = mongoose.model('Person', personSchema)

// const note = new Note({
//   content: 'HTML is easy',
//   important: true,
// })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = Person