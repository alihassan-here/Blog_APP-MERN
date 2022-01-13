const slugify = require("slugify");
const Post = require("../models/post.schema");

exports.createPost = (req, res) => {
    const { title, content, user } = req.body;
    const slug = slugify(title);
    //VALILDATE
    switch (true) {
        case !title:
            return res.status(400).json({ error: 'Title is required!' });
        case !content:
            return res.status(400).json({ error: 'Content is required' })
    }
    Post.create({ title, content, user, slug }, (err, post) => {
        if (err) {
            console.log(err);
            res.status(400).json({ error: 'Duplicate post. Try another title!' })
        }
        res.json({ post });
    })
}

exports.listPosts = (req, res) => {
    //GET 5 POSTS WITH SORTED LATEST
    Post.find({}).limit(5).sort({ createdAt: -1 }).exec((err, posts) => {
        if (err) console.log(err);
        res.status(200).json({ posts })
    })
}
exports.readSinglePost = (req, res) => {
    //get single post
    const { slug } = req.params;
    Post.findOne({ slug })
        .exec((err, post) => {
            if (err) console.log(err);
            res.status(200).json(post);
        })
}

exports.update = (req, res) => {
    const { slug } = req.params;
    const { title, content, user } = req.body;
    Post.findOneAndUpdate({ slug }, { title, content, user }, { new: true }).exec((err, post) => {
        if (err) console.log(err);
        res.status(200).json(post);
    })
}
exports.remove = (req, res) => {
    //delete single post
    const { slug } = req.params;
    Post.findOneAndRemove({ slug })
        .exec((err, post) => {
            if (err) console.log(err);
            res.status(200).json({ message: 'Post Deleted!' });
        })
}