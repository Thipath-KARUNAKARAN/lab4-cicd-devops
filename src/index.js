const express = require('express')
const userRouter = require('./routes/user')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

const db = require('./dbClient')
db.on("error", (err) => {
  console.error(err)
})

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/user', userRouter)

// Documentation Swagger
const expressSwagger = require('express-swagger-generator')(app)
expressSwagger({
  swaggerDefinition: {
    info: {
      title: 'User API',
      description: 'API REST de gestion des utilisateurs',
      version: '1.0.0'
    },
    host: 'localhost:3000',
    basePath: '/',
    produces: ['application/json'],
    schemes: ['http']
  },
  basedir: __dirname,
  files: ['./routes/**/*.js']
})

const server = app.listen(port, (err) => {
  if (err) throw err
  console.log("Server listening the port " + port)
})


module.exports = server
