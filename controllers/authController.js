const asyncHandler = require("express-async-handler");
const bcryptjs = require ('bcrypt')
const jwt = require ('jsonwebtoken')
const User = require("../model/user");

const login = asyncHandler(async(req,res)=>{
    const username= req.body.username
    const user = await User.findOne({username})
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcryptjs.compare(req.body.password,user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    const token = await jwt.sign ({_id:user._id.toString() } , "nesrine20")
    user.tokens = user.tokens.concat(token)
    await user.save().then((user)=>{
        res.send(user)

    })
    
})

const logout = asyncHandler(async(req,res)=>{
   
        console.log(req.user)
        req.user.tokens = req.user.tokens.filter((el)=>{
            return el !== req.token
        })
        await req.user.save().then(res.send("deleted"))
})
const refresh = asyncHandler((req, res) => {
    // console.log("nesrine hhhhhh")
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, "nesrine20", (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
  
      const newToken = jwt.sign({ userId: decoded.userId }, "nesrine20", {
        expiresIn: '1h', 
      });
      
  
      res.status(200).json({ token: newToken });
    });
  });
module.exports = {
    login,
    logout,
    refresh
}