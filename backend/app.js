const express = require('express')
const app = express()
const cors = require('cors')

const sequelize = require('./util/db')

const libraryRoutes = require('./routes/library')


app.use(cors())
app.use(express.json())


app.use('/library' , libraryRoutes);

sequelize
.sync()
// .sync({force : true})
.then(()=>{
    app.listen(4000)
}).catch(e => 
    {
        console.log(e)
    })