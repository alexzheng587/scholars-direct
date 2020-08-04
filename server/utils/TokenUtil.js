const jwt = require('jsonwebtoken');

const createToken = function (auth) {
    return jwt.sign({
        id: auth.id,
        role: auth.role
    }, 'mock-secret', // TODO: sign with real secret from config file
        {
            expiresIn: 60 * 100
        });
};

module.exports = {
    generateToken: function (req, res, next) {
        req.token = createToken(req.auth);
        return next();
    },
    sendToken: function (req, res) {
        res.setHeader('x-auth-token', req.token);
        res.cookie('_session', req.token, { maxAge: 6000000 }); // expires in 100 minute for now
        return res.status(200).send(req.auth);
    }
};
