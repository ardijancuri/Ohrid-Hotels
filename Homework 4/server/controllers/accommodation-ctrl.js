const Accommodation = require('../models/accomodations-model')

createAccommodation = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an accommodation',
        })
    }

    const accommodation = new Accommodation(body)

    if (!accommodation) {
        return res.status(400).json({ success: false, error: err })
    }

    accommodation
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: accommodation._id,
                message: 'Accommodation created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Accommodation not created!',
            })
        })
}

updateAccommodation = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Accommodation.findOne({ _id: req.params.id }, (err, accommodation) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Accommodation not found!',
            })
        }
        accommodation['@id'] = body['@id']
        accommodation['@lat'] = body['@lat']
        accommodation['@lon'] = body['@lon']
        accommodation.tourism = body.tourism
        accommodation.name = body.name
        accommodation
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: accommodation._id,
                    message: 'Accommodation updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Accommodation not updated!',
                })
            })
    })
}

deleteAccommodation = async (req, res) => {
    await Accommodation.findOneAndDelete({ _id: req.params.id }, (err, accommodation) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!accommodation) {
            return res
                .status(404)
                .json({ success: false, error: `Accommodation not found` })
        }

        return res.status(200).json({ success: true, data: accommodation })
    }).catch(err => console.log(err))
}

getAccommodationById = async (req, res) => {
    await Accommodation.findOne({ _id: req.params.id }, (err, accommodation) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: accommodation })
    }).catch(err => console.log(err))
}

getAccommodations = async (req, res) => {
    await Accommodation.find({}, (err, accommodations) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!accommodations.length) {
            return res
                .status(404)
                .json({ success: false, error: `Accommodation not found` })
        }
        return res.status(200).json({ success: true, data: accommodations })
    }).catch(err => console.log(err))
}

module.exports = {
    createAccommodation,
    updateAccommodation,
    deleteAccommodation,
    getAccommodations,
    getAccommodationById,
}