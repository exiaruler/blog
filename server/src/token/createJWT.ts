import jwt from 'jsonwebtoken'
require ("dotenv").config(); 

function createJWT(id,role){
    const payload = {
        user: {
            id: id,
            role:role,
            
        },
    };
    return jwt.sign(payload,process.env.TOKEN_SECRET,{ expiresIn: 60 * 60 });
}
module.exports = createJWT;