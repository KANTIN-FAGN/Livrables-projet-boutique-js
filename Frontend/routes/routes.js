const express = require('express')
const router = express.Router()
const controller = require('../controller/controller')

router.get('/accueil', controller.Index)

module.exports = router