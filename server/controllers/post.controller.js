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