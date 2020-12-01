const jwt=require('jsonwebtoken');
const { secretKey } = require('../config/db');

function auth(req,res,next) 
{
    const token = req.header('auth_token');

    if(!token) return res.json({"msg":"Access Denied"});

    try
    {
        const verify=jwt.verify(token,secretKey);
        req.user=verify;
        next(); //TOKEN verified :: continue with the req
    }
    catch(err)
    {
        console.log(err);
    }
}

module.exports=auth;