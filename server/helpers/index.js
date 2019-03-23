const express = require('express')
const app = express()
const port = 3000
const endpoints = require('./endpoints')
const swaggerDocs = require('./swaggerDocs')

endpoints(app)
swaggerDocs(app)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))