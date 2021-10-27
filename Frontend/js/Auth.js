const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {

    const token = req.headers['cookie'].split('Token=')[1];
    

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

        const roleHeader = req.headers['cookie'].split('Token=')[1];
        console.log('roleHeader', roleHeader);
        const decodeUserInfo = jwt.decode(roleHeader);


        if (decodeUserInfo.role === role) {

            return next();

        }

        return res.status(401).json({ msj: 'You are not authorized to use this page' })


    }



}

// function RefreshToken(req, res, next) {
//     // const { Email } = req.body;
//     const userfind = await User.findOne({ Email });
//     const refreshToken = jwt.sign({Nombre: userfind.Nombre, Email: userfind.Email, role: userfind.role}, process.env.REFRESH_TOKEN_SECRET, {
//         expiresIn: "1y"
//     });

//     }


module.exports = { verifyRole, verifyToken };