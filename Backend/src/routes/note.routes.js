const express = require('express')
const { createNoteController, getNotesController , updateNoteController , deleteNoteController} = require('../controllers/note.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const router = express.Router()

router.route('/')
    .get(authMiddleware , getNotesController )
    .post(authMiddleware, createNoteController)

router.put('/:id' , authMiddleware , updateNoteController)
router.delete('/:id' , authMiddleware , deleteNoteController)


module.exports = router