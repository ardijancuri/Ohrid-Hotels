const mongoose = require('mongoose')

mongoose
    .connect("mongodb+srv://linagrozdanovska:150999Lg%21@cluster0.2qfwh.mongodb.net/ohrid-hotels?retryWrites=true&w=majority", { useNewUrlParser: true })
    .then(() => {
        console.log("Successfully connected to the database")
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })

module.exports = mongoose.connection