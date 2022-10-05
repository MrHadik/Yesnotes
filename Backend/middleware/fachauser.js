const jwt = require("jsonwebtoken");

const fachauser =(req,res,next)=>{
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).json({ error: "Login fist" });
    }
    
    try {
        const userdata = jwt.verify(token,"H@rd!k#$110");
        req.userdata = userdata;
        next();
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Server Error is rung" });
    }
    
}

module.exports = fachauser;