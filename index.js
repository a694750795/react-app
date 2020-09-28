const express = require("express");
const app = express()
const morgan = require('morgan')
const cros = require('cors')

app.use(cros())
app.use(express.json())
app.use(morgan('combined'))
// 返回当前最大id
const generateId = () => {
    const randomId = Math.floor(Math.random()*1000000000000000000000)
    return randomId
}
let notes = [{
    id: 1,
    name: "leo",
    number: "123456"
}, {
    id: 2,
    name: "jim",
    number: "123456"
}, {
    id: 3,
    name: "tom",
    number: "123456"
}, ]
app.get('/', (req, res) => {
    res.send('<h1>hello,world!111')
})
app.get('/api/persons', (req, res) => {
    res.json(notes)
})
app.get('/api/info', (req, res) => {
    res.send(`phonebook has info ${notes.length} people <br/> ${new Date()}`)
})
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    note = notes.find(note => note.id === id)
    if (!note) {
        return res.status(400).json({
            error: 'info missing'
        })
    }
    res.json(note)
})
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id === id)
    res.status(204).end()
})
app.post('/api/persons', (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({
            error: 'name missing'
        })
    } else if (!req.body.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    }
    let note = {
        name: req.body.name,
        number: req.body.number || false,
        id: generateId()
    }
    notes = notes.concat(note)
    res.json(note)
})
const POST = 3002;
app.listen(POST, () => {
    console.log(`server 运行在${POST}端口`);
})
