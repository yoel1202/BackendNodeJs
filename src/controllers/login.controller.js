import { methods as database } from "./../database/database";
// const database = require("./../database/database")
import jwt from "jsonwebtoken"
import moment from'moment-timezone';

const login = async (req, res) => {
    const { username, password } = req.body;

    if (username === undefined || password === undefined) {
        res.status(400).json({ message: "Bad Request. Por favor llenar los campos." });
    } else {
        let codeUser = null;
        try {
            const result = await database.sqlSentences("call `Login.validateUser`" + `('${username}','${password}', @Mensaje)`);
            codeUser = result[0][0].Codigo_Usuario
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
        if (codeUser != null) {
            try {
                let token = await generateToken({ username, password })
                const date = new Date()
                let dateNow = moment(date).format('YYYY-MM-DD  HH:mm:ss.000')
                let dateExpires = moment(date).add(5, 'hours').format('YYYY-MM-DD  HH:mm:ss.000'); 

                const result = await database.sqlSentences("call `Login.InsertTokenJwt`"+`('${codeUser}','${token}','${dateNow}','${dateExpires}')`);
                if (result[0][0].Token == token) {
                    res.json({ accessToken: token });
                } else {
                    res.json({ accessToken: "imposible crear el token reintente nuevamente" });
                }

            } catch (error) {
                res.status(500);
                res.send(error.message);
            }

        } else {
            res.status(401);
            res.json({ error: "usuario y contraseña son incorrectas, por favor verificar credenciales" });
        }

    }
};

const verifyToken = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];
        try {
            const result = await database.sqlSentences("call `Login.selectTokenJwt`"+`('${bearerToken}')`);
           if(Array.isArray(result[0]) && result[0].length > 0){
            req.token = bearerToken;
            next()
           }else{
            res.status(401).json({ message: "Bad Request. El token se encuentra vencido." });
           }
           
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
      
    } else {
        res.sendStatus(403);
    }
}
const verifyTokenUsers = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];
        try {
            const result = await database.sqlSentences("call `Login.selectTokenJwt`"+`('${bearerToken}')`);
           if(Array.isArray(result[0]) && result[0].length > 0){
            req.token = bearerToken;
            res.status(200);
            res.send("valido");
           }else{
            res.status(401).json({ message: "Bad Request. El token se encuentra vencido." });
           }
           
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
      
    } else {
        res.sendStatus(403);
    }
}
const generateToken = async (params) => {
    return jwt.sign(params, 'secret', { expiresIn: '1h' }, 'JWT_SECRET');
}
export const methods = {
    login,
    verifyToken,
    verifyTokenUsers
};
