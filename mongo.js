//TÄMÄ TIEDOSTO ON TURHA??

// const mongoose = require('mongoose')

// if ( process.argv.length<3 ) {
//   console.log('give password as argument')
//   console.log(process.argv[2])
//   process.exit(1)
// }

// const password = process.argv[2]

// const url =
//   `mongodb+srv://daniela:${password}@cluster0-ogyp2.mongodb.net/person-app?retryWrites=true&w=majority`

// mongoose.connect(url, { useNewUrlParser: true })

// const noteSchema = new mongoose.Schema({
//   id: Number,
//   name: String,
//   number: String,
// })

// const Person = mongoose.model('Person', noteSchema)

// if ( process.argv.length === 3) {
//     console.log('komennossa 3 sanaa')
//     console.log('phonebook:')
//     //miks tää piti ottaa pois??????
//     //process.exit(1) 
    
//     Person.find({}).then(result => {
//         result.forEach(person => {
//           console.log(person.name + ' ' +  person.number)
//         })
//         mongoose.connection.close()
//       })

//   }

//   if ( process.argv.length === 5) {
//     console.log('komennossa 5 sanaa')
//     //miksi täää piti ottaa pois?????
//     //process.exit(1)

//     const person = new Person({
//         id: 99,
//         name: process.argv[3],
//         number: process.argv[4],
//       })
      
//       person.save().then(response => {
//         console.log('Added ' + person.name + ' number ' + person.number + ' to phonebook!');
//         mongoose.connection.close();
//       })      
//   }