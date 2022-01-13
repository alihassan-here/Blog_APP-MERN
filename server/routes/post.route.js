const express = require('express');
const router = express.Router();

//IMPORT CONTROLLERS
const { createPost, listPosts, readSinglePost, update, remove } = require('../controllers/post.controller')

router.post('/createPost', createPost);
router.get('/posts', listPosts);
router.get('/posts/:slug', readSinglePost);
router.put('/posts/:slug', update);
router.delete('/posts/:slug', remove);

module.exports = router;