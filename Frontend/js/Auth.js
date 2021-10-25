const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['authenticate']

    if (true) {

        if (!token) return res.status(401).json({ error: 'Acceso denegado' })
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = verified
        // console.log(verified)
        next()
        // continuamos
    } else {
        res.status(400).json({ error: 'token no es válido' })
    }
}

function verifyRole(role) {
    return async (req, res, next) => {

        const roleHeader = req.headers['authenticate']
        const decodeUserInfo = jwt.decode(roleHeader);
        console.log(decodeUserInfo);


        if (decodeUserInfo.role === role) {

            return next();

        }

        return res.status(401).json({ msj: 'You are not authorized to use this page' })


    }



}


module.exports = { verifyRole, verifyToken };