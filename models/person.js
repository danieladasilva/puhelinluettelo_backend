const mongoose = require('mongoose')
//UUSI LISÄTTY 18.09.2019:
require('dotenv').config()
const url = process.env.MONGODB_URI

console.log('yhdistetään osoitteeseen: ', url)

mongoose.connect(url, { useNewUrlParser: true })
    .then(result => {
        console.log('yhteyden ottaminen MongoDB onnistui')
})
    .catch((error) => {
        console.log('yhteyden ottaminen MongoDB epäonnistui:', error.message)
})

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

//const Person = mongoose.model('Person', personSchema)

if ( process.argv.length === 3) {
    console.log('komennossa 3 sanaa')
    console.log('phonebook:')
    //miks tää piti ottaa pois??????
    //process.exit(1) 
    
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person.name + ' ' +  person.number)
        })
        mongoose.connection.close()
      })

  }

  if ( process.argv.length === 5) {
    console.log('komennossa 5 sanaa')
    //miksi täää piti ottaa pois?????
    //process.exit(1)

    const person = new Person({
        id: 99,
        name: process.argv[3],
        number: process.argv[4],
      })
      
      person.save().then(response => {
        console.log('Added ' + person.name + ' number ' + person.number + ' to phonebook!');
        mongoose.connection.close();
      })      
  }

module.exports = mongoose.model('Person', personSchema)