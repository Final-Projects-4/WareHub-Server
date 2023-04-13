require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const cors = require('cors')
const router = require('./routes')
const morgan = require('morgan')
const errorHandler = require('./middlewares/errorHandler')




app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('tiny'))
app.use(cors())



app.use(router)
// app.get('/', (req, res) => {
  
// });
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});