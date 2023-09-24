const { conn } = require("../database/db")
const moment = require('moment')

module.exports.getLikes=(req, res)=>{

    const q='SELECT * FROM likes WHERE postId=?'
    conn.query(q,[req.query.post], (err, likes)=>{
        if(err) return res.status(500).json(err)
        return res.status(200).json(likes)
    })
}

module.exports.addLike=(req, res)=>{
    const q='INSERT INTO likes (userId, postId, created_at) VALUES (?)'
    const values=[req.userId, 
                  req.body.postId, 
                  moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                ]
    conn.query(q, [values], (err, data)=>{
        if(err) return res.status(500).json(err)
        return res.status(200).json('post has been liked')
    })
}

module.exports.removeLike=(req, res)=>{
    const q='DELETE FROM likes WHERE (postId=? AND userId=?)'   
    const values=[req.query.post, req.userId]
    conn.query(q, [...values], (err, data)=>{
        if(err)return res.status(500).json(err)
        if(data.affectedRows===0) return res.status(403).json('you havent credential to dislike this post')
        return res.status(200).json('post has been disliked²')
    })
}