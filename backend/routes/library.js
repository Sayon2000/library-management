const express = require('express')

const router = express.Router();
const library = require('../models/library')
const libraryController = require('../controller/library')


router.get('/', libraryController.getAllBooks)


router.post('/add', libraryController.addBook)


router.post('/return' ,libraryController.returnBook)



module.exports = router;