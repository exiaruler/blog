import jwt from 'jsonwebtoken'
require ("dotenv").config(); 
import { Settings } from '../Settings';

function createJWT(id,role){
    var setting=new Settings();
    const payload = {
        user: {
            id: id,
            role:role,
            
        },
    };
    return jwt.sign(payload,setting.jwttoken,{ expiresIn: 60 * 60 });
}
module.exports = createJWT;