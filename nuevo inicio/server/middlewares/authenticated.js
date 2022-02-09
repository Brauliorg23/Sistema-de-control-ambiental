const jwt = require("jwt-simple");
const moment = require("moment");

const SECRE_KEY = "hasdASDjdhAYi23#&1389CEgcf7834NAEO&3nf9aw3vsiod";

exports.ensureAuth = (req, res, next) =>{
    if(!req.headers.authorization) {
        return res
        .status(403)
        .send({message: "La peticion no tiene cabecera de autenticacion."});
    }
    
    const token = req.headers.authorization.replace(/['"]+/g, "");

    try {
        var payload = jwt.decode(token, SECRE_KEY);

        if(payload.exp <= moment.unix()){
            return res.status(404).send({message: "El token ha expirDO."});
        }
    }catch(ex){
        return res.status(404).send({message: " Token invalido."});
    }

    req.user = payload;
    next();
}