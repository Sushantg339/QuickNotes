const express = require('express')
const { createNoteController, getNotesController , updateNoteController , deleteNoteController , getOneNoteController} = require('../controllers/note.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const { route } = require('./auth.routes')
const router = express.Router()

router.route('/')
    .get(authMiddleware , getNotesController )
    .post(authMiddleware, createNoteController)

router.get('/:id' ,authMiddleware, getOneNoteController)
router.put('/:id' , authMiddleware , updateNoteController)
router.delete('/:id' , authMiddleware , deleteNoteController)


module.exports = router