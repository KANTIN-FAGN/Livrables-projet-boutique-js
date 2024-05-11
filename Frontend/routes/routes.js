const express = require('express')
const router = express.Router()
const controller = require('../controller/controller')

router.get('/Roid', controller.Index)

module.exports = router