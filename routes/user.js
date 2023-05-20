const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');


router.get('/', UserController.getAuth);

module.exports = router;