const path = require('path')
const express = require('express');
const bodyParser = require('body-parser')
const sequelize = require('./utils/database')

const app = express()


const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const errorController = require('./controllers/error')

app.set('view engine', 'ejs')
app.set('views', 'views')


app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminData.router)
app.use(shopRoutes)

app.use(errorController.get404)

sequelize
  .sync()
  .then(result => {
    app.listen(3001)
  })
  .catch(err => {
    console.log(err)
  })

