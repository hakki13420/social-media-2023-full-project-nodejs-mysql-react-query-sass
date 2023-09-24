const { conn } = require("../database/db")
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')

module.exports.register=async (req, res)=>{
    const q='SELECT * FROM USERS WHERE username=?'  
    
    conn.query(q,[req.body.username], async (err, data)=>{
        if(err) return res.status(500).json(err)
        if(data.length) return res.status(409).json('user already exist! try again')

        const salt= await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(req.body.password, salt)

        const q= `INSERT INTO USERS (name, username, password, email) VALUES (?)`
        const values=[req.body.name, req.body.username, hashedPassword,req.body.email]
        conn.query(q,[values],(err, data)=>{
            if(err) return res.status(500).json(err)
            return res.status(201).json("user created succefuly")
        })
    })
   
}

module.exports.login=(req, res)=>{
    const q="SELECT * FROM users WHERE username=?"

    conn.query(q, [req.body.username], (err, data)=>{
        if(err) return res.status(500).json(err)
        if(data.length===0) return res.status(404).json('user not exist')
        if(!bcrypt.compareSync(req.body.password, data[0].password))
            return res.status(400).json('pass errone')
        

        const token=jwt.sign(
            {
                id:data[0].id        
            }
            ,process.env.JWT_SECRET
        )
        const {password,...other}=data[0]
        
         const q2= 'UPDATE users SET online=? WHERE id=?'
         const values2=[1, data[0].id]
         conn.query(q2, values2, (err, user)=>{
            if(err) return res.status(500).json(err)
            if(user.affectedRows===0) return res.status(403).json('you havent credential to compleet this task')
            return res.cookie('accessToken', token,{
                httpOnly:true,
                maxAge:1 * 60 * 1000
            })
             .status(200)
             .json(other)
    
         })

    })
}


module.exports.logout=(req, res)=>{
    const q2= 'UPDATE users SET online=? WHERE id=?'
    const values2=[0, req.userId]
    conn.query(q2, values2, (err, user)=>{
       if(err) return res.status(500).json(err)
       if(user.affectedRows===0) return res.status(403).json('you havent credential to compleet this task')

       res.clearCookie('accessToken',{
        secure:true,
        sameSite:'none'
        })
        .status(200)
        .json('user has been logout')
    })
}