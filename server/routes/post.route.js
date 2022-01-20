const express = require('express');
const router = express.Router();

//IMPORT CONTROLLERS
const { createPost, listPosts, readSinglePost, update, remove } = require('../controllers/post.controller')

const { requireSignIn } = require('../controllers/auth.controller');

router.post('/createPost', requireSignIn, createPost);
router.get('/posts', listPosts);
router.get('/posts/:slug', readSinglePost);
router.put('/posts/:slug', requireSignIn, update);
router.delete('/posts/:slug', requireSignIn, remove);

module.exports = router;