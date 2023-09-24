const { conn } = require("../database/db")
const jwt =require('jsonwebtoken')
const moment = require ('moment')

module.exports.getPosts=(req, res)=>{
    const user=req.query.user  
    console.log('req url',req.url)  
    const q=user!=='undefined'
        ? `SELECT p.id, p.content, p.picture, p.userId AS 'owner', p.created_at, 0 AS 'shared', u.id AS 'publisher', u.username, u.profilePicture, u.coverPicture 
        FROM posts AS p 
        JOIN users AS u ON (p.userId=u.id)
        WHERE p.userId=?
        UNION 
        SELECT p.id, p.content, p.picture, p.userId AS 'owner', s.created_at, 1 AS 'shared', u.id AS 'publisher', u.username, u.profilePicture, u.coverPicture   
        FROM posts AS p
        JOIN shares AS s ON s.postId=p.id
        JOIN users AS u ON s.userId=u.id  
        WHERE s.userId=?
        ORDER BY created_at DESC        
        `
        :`SELECT p.id, p.content, p.picture, p.userId AS 'owner', p.created_at, 0 AS 'shared', u.id AS 'publisher', u.username, u.profilePicture, u.coverPicture   
        FROM posts AS p 
        JOIN users AS u ON (p.userId=u.id)
        LEFT JOIN relationShips AS r ON (r.followed=p.userId) 
        WHERE p.userId=? OR r.follower=?
        UNION 
        SELECT p.id, p.content, p.picture, p.userId AS 'owner', s.created_at, 1 AS 'shared', u.id AS 'publisher', u.username, u.profilePicture, u.coverPicture   
        FROM posts AS p
        JOIN shares AS s ON s.postId=p.id
        JOIN users AS u ON s.userId=u.id  
        WHERE s.userId=?
        ORDER BY created_at DESC`
    const values = user!=='undefined'
        ?[user, user]
        :[req.userId, req.userId, req.userId]
    conn.query(q,values, (err, data)=>{
        if(err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
    
}


module.exports.addPost=(req, res)=>{

    const q='INSERT INTO posts (content, picture, userId, created_at) VALUES (?)'
    const values=[
        req.body.content,
        req.body.picture,
        req.userId,
        moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    ]
    conn.query(q, [values], (err, data)=>{
        if(err) return res.status(500).json(err)
        return res.status(201).json('post created')
    })        
}

module.exports.removePost=(req, res)=>{
    const {id}=req.params
    const {shared}=req.query

    const q=shared!=='1'
            ?'DELETE FROM posts WHERE id=? AND userId=?'
            :'DELETE FROM shares WHERE postId=? AND userId=?'
    conn.query(q, [id, req.userId], (err, data)=>{
        if (err) return res.status(500).json(err)
        console.log('delet data',data)
        if(data.affectedRows===0) return res.status(403).json('you havent credential to remove thos post')
        return res.status(200).json('post eleted')
    })
}