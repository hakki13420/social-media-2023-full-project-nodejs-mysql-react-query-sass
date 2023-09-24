const moment=require('moment')
const { conn } = require('../database/db')

module.exports.getSharePost=(req, res)=>{
    const q='SELECT * FROM shares WHERE postId=?'
    conn.query(q, req.query.post, (err, shares)=>{
        if(err) return res.status(500).json(err)
        return res.status(200).json(shares)
    })
}


module.exports.sharePost=(req, res)=>{

    const q=`INSERT INTO shares (postId, userId, fromUserId, created_at)
    VALUES (?)
    `
    const values=[
        req.body.postId,
        req.userId,
        req.body.fromUserId,
        moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    ]

    console.log('body shares',req.body)
    conn.query(q, [values], (err, data)=>{
        if(err) return res.status(500).json(err)
        return res.status(200).json('post shared')
    })
}