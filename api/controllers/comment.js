const jwt=require('jsonwebtoken')
const { conn } = require('../database/db')
const moment = require('moment')

module.exports.getCommentsOfPost=(req, res)=>{
  
    const q=   `SELECT c.*, u.username, u.profilePicture 
                FROM comments AS c 
                JOIN users AS u 
                ON (c.userId=u.id)
                WHERE c.postId=?
                `
    conn.query(q,[req.query.post], (err, data)=>{
        if(err) return res.status(500).json(err)
        return res.status(200).json(data)
    })

}

module.exports.addCommentOfPost=(req, res)=>{
    const q=`
        INSERT INTO comments (comment, userId, postId, created_at)
        VALUE (?) 
        `
    const values=[
        req.body.comment,
        req.userId, 
        req.body.postId,
        moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    ]
    conn.query(q,[values], (err, data)=>{
        if(err) return res.status(500).json(err)
        return res.status(200).json('comment created')
    })
}