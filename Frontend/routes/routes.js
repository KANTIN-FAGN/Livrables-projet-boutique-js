const express = require('express')
const router = express.Router()
const controller = require('../controller/controller')

router.get('/Roid', controller.Index)
router.get('/Roid/mode-homme', controller.ArticlesHomme)
router.get('/Roid/mode-femme', controller.ArticlesFemme)

module.exports = router