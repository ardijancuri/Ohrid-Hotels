const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Accommodation= new Schema(
    {
        '@id': { type: String, required: true },
        '@lat': { type: Number, required: true },
        '@lon': { type: Number, required: true },
        tourism: { type: String, required: true },
        name: { type: String, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('accommodations', Accommodation, 'accommodations')