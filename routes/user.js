const express = require('express')
const { loginUser, createUser, getConnectedUser } = require('../controllers/user')
const AuthGuard = require('../middlewares/AuthGuard')
const router = express.Router()

router.post('/login', loginUser)
router.post('/register', createUser)
router.get('/connected-user', AuthGuard, getConnectedUser)

module.exports = router