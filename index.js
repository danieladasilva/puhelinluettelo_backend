//otetaan express käyttöön
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')


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

let persons = [
    {
      id: 1,
      name: "Maija Mehiläinen",
      number: "040-123456"
    },
    {
        id: 2,
        name: "Matti Meikäläinen",
        number: "050-123456"
    },
    {
        id: 3,
        name: "Aino Anttila",
        number: "045-654321"
    },
    {
        id: 4,
        name: "Kari Lehto",
        number: "040-654321"
    }    
]

//ROUTES

app.get('/', (req, res) => {
    res.send('<h1>Hello World!!!</h1>')
})
  
app.get('/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const length = persons.length
    const date = new Date()
    res.send('Puhelinluettelossa on '+ length + ' henkilöä.' + date)
    
})

    //yksittäisen henkilön näyttäminen
app.get('/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

    //resurssin poistaminen
app.delete('/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
      
    response.status(204).end()
})

  //uuden muistiinpanon lisääminen 1/2
const generateId = () => {
    
    return Math.floor(Math.random()*1000000)
}
  //uuden muistiinpanon lisääminen 2/2
app.post('/persons', (request, response) => {
    const person = request.body
  
    if (!person.name) {
      return response.status(400).json({ 
        error: 'nimi puuttuu' 
        })
    }

    if (!person.number) {
        return response.status(400).json({ 
          error: 'numero puuttuu' 
          })
      }

    if (persons.find(element => element.name === person.name)) {
        return response.status(400).json({ 
            error: 'nimi on jo listassa' 
            })
    }
  
    const personi = {
      name: person.name,
      number: person.number || false,
      id: generateId(),
    }
        //tehtään uusi persons-lista, jossa mukana uusi person
    persons = persons.concat(personi)
  
    response.json(personi)
})



 
//määritetään kuunneltava portti
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})