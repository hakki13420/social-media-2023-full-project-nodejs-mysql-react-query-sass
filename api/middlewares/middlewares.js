const multer = require("multer")
const jwt = require('jsonwebtoken')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/uploads')
    },
    filename: function (req, file, cb) {      
      cb(null, Date.now()+'-'+file.originalname )
    }
  })
  
module.exports.upload = multer({ storage: storage })


module.exports.isAuthenticated=(req, res, next)=>{
  const token=req.cookies.accessToken
    if (!token) return res.status(401).json('user not logged')
    jwt.verify(token , process.env.JWT_SECRET, (err, user)=>{
        if(err) return res.status(403).json('invalid token')
        req.userId=user.id
        next()
    })
}