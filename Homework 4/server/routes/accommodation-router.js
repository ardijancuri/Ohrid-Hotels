const express = require('express')

const AccommodationCtrl = require('../controllers/accommodation-ctrl')

const router = express.Router()

router.post('/accommodation', AccommodationCtrl.createAccommodation)
router.put('/accommodation/:id', AccommodationCtrl.updateAccommodation)
router.delete('/accommodation/:id', AccommodationCtrl.deleteAccommodation)
router.get('/accommodation/:id', AccommodationCtrl.getAccommodationById)
router.get('/accommodations', AccommodationCtrl.getAccommodations)

module.exports = router
