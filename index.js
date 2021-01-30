const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dbConnection = require('./helpers/db-connection')
const constants = require('./helpers/constants')

const app = express()

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.json());
app.use(express.json());

const componentsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: String,
    id: String,
    name: String,
    price: Number,
    imageUrl: String,
    description: String,
});

const Components = mongoose.model('Components', componentsSchema);

app.get('/api/components', async (req,res) => {
    await Components.find({},(error, data) => {
        if (!error) {
            res.json({ data })
        } else {
            return res.status(400).send({
                message: error
            })
        }
    })
})

app.get('/api/components/:type', async (req,res) => {
    let searchName = req.params.type
    await Components.find({ type: searchName}, (error, data) => {
        if (!error) {
            res.json( data )
        } else {
            return res.status(400).send({
                message: error
            })
        }
    })

})

dbConnection()
app.listen(PORT, () => { console.log(`Server has been started on port ${PORT}`)})
