const express = require('express')
const cors = require('./middleware/cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const router = require('./routes')

// app.get('/', (req, res) => res.send('Hello World!'))

app.use(cors)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', router)

app.listen(port, () =>
  console.log(`THE Token API listening on http://localhost:${port}!`)
)