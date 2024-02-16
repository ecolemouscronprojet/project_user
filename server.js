const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const app = express()


app.set('view engine', 'ejs')
app.use(expressLayouts)

app.use(express.static(path.join(__dirname, 'public')))

const port = 3000

const routes = require('./routes/index')
app.use('/', routes)

app.listen(port, () => {
  console.log(`Application lancée sur le port ${port}`)
})