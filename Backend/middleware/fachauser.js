const jwt = require("jsonwebtoken");

const fachauser =(req,res,next)=>{
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).json({ error: "Login fist" });
    }
    
    try {
        const userdata = jwt.verify(token,"H@rd!k#$110");
        req.userdata = userdata.user;
        next();
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
    
}

module.exports = fachauser;