//kirjastot käyttöön täällä
require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


morgan.token('type',  (req, res) => 
                { 
                  if(req.method==="POST") {
                    return  JSON.stringify(req.body)
                  }
                }
)


app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(morgan(':type'))
app.use(cors())
app.use(express.static('build'))



//TÄSSÄ KOHTAA OLI KOODATTUNA HENKILÖITÄ NOTES-TAULUKKOON

let persons = []


//ROUTES

app.get('/', (req, res) => {
    res.send('<h1>Hello World!!!</h1>')
})



    //HENKILÖIDEN LISTAAMINEN - TIETOKANTA TOIMII

app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(notes => {
        response.json(notes.map(note => note.toJSON()))
      })
      .catch(error => {next(error)})
  })



    //INFON NÄYTTÄMINEN - TIETOKANTA TOIMII

app.get('/info', (req, res, next) => {
    const date = new Date()
    Person.find({}).then(persons => {
        res.send('Puhelinluettelossa on '+ persons.length + ' henkilöä.' + date)
    })
    .catch(error => {next(error)})
})




    //YKSITTÄISEN HENKILÖN NÄYTTÄMINEN - TIETOKANTA TOIMII

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
      .then(person => {
        if (person) {
          response.json(person.toJSON())
        } else {
          response.status(404).end() 
        }
      })
      .catch(error => {next(error)})
  })




        //RESURSSIN NUMERON PÄIVITTÄMINEN - TIETOKANTA TOIMII

  app.put('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndUpdate(request.params.id, 
                           {number: request.body.number},
                           {new: true})
      .then(result => {
        response.json(result.toJSON())
      })
      .catch(error => {next(error)})
  })




    //RESURSSIN POISTAMINEN - TIETOKANTA TOIMII

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => {next(error)})
  })



    //UUDEN RESURSSIN LISÄÄMINEN - ONKO TÄMÄ KESKEN????????

const generateId = () => {
    return Math.floor(Math.random()*1000000)
}

app.post('/api/persons', (request, response, next) => {
    const person = request.body
  
    // if (!person.name) {
    //   return response.status(400).json({ 
    //     error: 'nimi puuttuu' 
    //     })
    // }

    // if (!person.number) {
    //     return response.status(400).json({ 
    //       error: 'numero puuttuu' 
    //       })
    //   }
      
    // if (persons.find(element => element.name === person.name)) {
    //     return response.status(400).json({ 
    //         error: 'nimi on jo listassa' 
    //         })
    // }
  
    const personi = new Person({
        name: person.name,
        number: person.number || false,
        id: generateId(),
      })

        //tehtään uusi persons-lista, jossa mukana uusi person
    persons = persons.concat(personi)
  
    //response.json(personi)
    personi.save()
        .then(savedPerson => {
            response.json(savedPerson.toJSON())
        })
        .catch(error => next(error))
})







const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return response.status(400).send({ error: 'id on vääränmuotoinen' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: 'Nimi ei ole uniikki: ' + error.message })
    }
  
    next(error)
} 
app.use(errorHandler)


 
//määritetään kuunneltava portti
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})