const express = require('express')
const router = express.Router()
const controller = require('../controller/controller')

router.get('/index', controller.Index)

module.exports = router