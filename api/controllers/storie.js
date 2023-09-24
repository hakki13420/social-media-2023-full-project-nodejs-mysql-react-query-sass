const { conn } = require("../database/db")
const moment = require("moment")

module.exports.getStories=(req, res)=>{
    const q=`
        SELECT u.username, u.profilePicture, u.coverPicture, s.* FROM users AS u
        JOIN relationships AS r
        ON u.id=r.followed
        JOIN stories AS s
        ON s.userId=u.id
        WHERE r.follower=?
        UNION
        SELECT u.username, u.profilePicture, u.coverPicture, s.* 
        FROM users AS u
        JOIN stories AS s
        ON u.id=s.userId
        WHERE u.id=?
    `
    conn.query(q, [req.userId, req.userId], (err, stories)=>{
        if(err) return res.status(500).json(err)
        return res.status(200).json(stories)
    })
}


module.exports.addStory=(req, res)=>{
    const q=`
        INSERT INTO stories (storyPicture, userId, created_at)
        VALUES (?)
    `
    console.log(req.body)
    const values=[
        req.body.storyPicture,
        req.userId,
        moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    ]
    conn.query(q, [values], (err, data)=>{
        if(err) return res.status(500).json(err)
        return res.status(200).json('story has been cfreated')
    })
    
}