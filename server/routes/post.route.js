const express = require('express');
const router = express.Router();

//IMPORT CONTROLLERS
const { createPost } = require('../controllers/post.controller')

router.post('/post', createPost);

module.exports = router;