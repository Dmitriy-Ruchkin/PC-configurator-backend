const mongoose = require('mongoose')
const constants = require('./constants')

module.exports = async function start() {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        }, err => (error) => {
            console.log(error)
        })
}
