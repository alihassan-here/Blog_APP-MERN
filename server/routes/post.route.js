const express = require('express');
const router = express.Router();

//IMPORT CONTROLLERS
const { createPost, listPosts, readSinglePost } = require('../controllers/post.controller')

router.post('/createPost', createPost);
router.get('/posts', listPosts);
router.get('/posts/:slug', readSinglePost);

module.exports = router;