const jwt = require("jsonwebtoken")
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        // token_created = token.slice(4, token.length - 1)
        jwt.verify(token, "sagarika", (err, user) => {
            if (err) {
                res.sendStatus(403);
            }
            else {
                req.user = user;
                next();
            }
        });
    } else {
        res.sendStatus(401);

    }
}






// const authenticateJWT = (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if (authHeader) {
//         const token = authHeader.split(' ')[1];

//         jwt.verify(token, accessTokenSecret, (err, user) => {
//             if (err) {
//                 return res.sendStatus(403);
//             }

//             req.user = user;
//             next();
//         });
//     } else {
//         res.sendStatus(401);
//     }
// };