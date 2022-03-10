const jwt = require("jwt-simple");
const moment = require("moment");
const user = require("../models/user");

const SECRE_KEY = "hasdASDjdhAYi23#&1389CEgcf7834NAEO&3nf9aw3vsiod";

exports.createAccessToken = function(user) {
    const playload = {
        id: user._id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        createAccesToken: moment().unix(),
        exp: moment().add(8, "hours").unix()
    };
    return jwt.encode(playload, SECRE_KEY);
};

exports.createRefreshToken = function(user) {
    const payload = {
      id: user._id,
      exp: moment()
        .add(1, "days")
        .unix()
    };
  
    return jwt.encode(payload, SECRE_KEY);
};
  
exports.decodedToken = function(token) {
    return jwt.decode(token, SECRE_KEY, true);
};