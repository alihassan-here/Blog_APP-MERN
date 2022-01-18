const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
exports.login = (req, res) => {
    const { name, password } = req.body;
    if (password === process.env.PASSWORD) {
        //generate token and send to client
        const token = jwt.sign({ name }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return res.status(200).json({ token, name });

    } else {
        return res.status(400).json({
            error: 'Invalid password!'
        })
    }
}