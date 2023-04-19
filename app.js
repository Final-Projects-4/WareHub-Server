require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const cors = require('cors')
const router = require('./routes')
const morgan = require('morgan')
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const errorHandler = require('./middlewares/errorHandler')
const { configSwagger } = require('./config/configSwagger')

const specs = swaggerJsdoc(configSwagger);



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('tiny'))
app.use(cors())
app.use('/api-doc',swaggerUI.serve, swaggerUI.setup(specs))


app.use(router)
// app.get('/', (req, res) => {
  
// });
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});