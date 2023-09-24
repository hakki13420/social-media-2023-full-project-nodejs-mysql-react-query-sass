const { conn } = require("../database/db")

module.exports.getFriends=(req, res)=>{
    const user=req.query.friends
    const suggestion=req.query.suggestion
    let q=''
    let values=[]
    if(user!==undefined && suggestion===undefined){
        q=`SELECT u.* 
        FROM users AS u 
        JOIN relationships AS r ON r.followed=u.id
        WHERE r.follower=?
        UNION
        SELECT u.* 
        FROM users AS u 
        JOIN relationships AS r ON r.follower=u.id
        WHERE r.followed=?
        `
        values=[user, user]
    }
    if(suggestion!==undefined && user===undefined){
        q=`SELECT * FROM users
        JOIN relationships ON users.id=relationships.follower
        WHERE relationships.followed IN(
            SELECT u.id 
            FROM users AS u 
            JOIN relationships AS r ON r.followed=u.id
            WHERE r.follower=?
            ) AND users.id<>?
            AND users.id NOT IN (
                SELECT u.id 
                FROM users AS u 
                JOIN relationships AS r ON r.followed=u.id
                WHERE r.follower=?
                )
            
            `
    values=[suggestion, suggestion, suggestion]

}    
conn.query(q,[...values], (err, users)=>{
    if(err) return res.status(500).json(err)
    return res.status(200).json(users)
})
    
}

module.exports.getUser=(req, res)=>{

    const q='SELECT * FROM users WHERE id=?'
        
    conn.query(q,req.params.id, (err, user)=>{
        if(err) return res.status(500).json(err)
        const {password,...others}=user[0]
        return res.status(200).json(others)
    })
}

module.exports.updateUser=(req, res)=>{
    const q=`UPDATE users
    SET name=?, username=?, email=?, country=?, webSite=?, coverPicture=?, profilePicture=?
    WHERE id=?
    `
    const values=[
        req.body.name,
        req.body.username,
        req.body.email,
        req.body.country,
        req.body.webSite,
        req.body.coverPicture,
        req.body.profilePicture,
        req.userId
    ]

    conn.query(q, values, (err, user)=>{
        if(err) return res.status(500).json(err)
        if(user.affectedRows===0) return res.status(403).json('you havent credential to update this profile')
        return res.status(200).json('profile has been updated')
    })
}