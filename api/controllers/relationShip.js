const { conn } = require("../database/db")


module.exports.getrelationShips=(req, res)=>{
    const q='SELECT * FROM relationships WHERE followed=?'
    conn.query(q, [req.query.followedId], (err, relations)=>{
        if(err) return res.status(500).json(err)
        return res.status(200).json(relations)
    })
}

module.exports.addRelationShip=(req, res)=>{

    const q=`INSERT INTO relationships 
    (followed, follower)
    VALUES(?)
    `
    const values=[req.body.followed, req.userId]
    conn.query(q, [values], (err, data)=>{
        if(err) return res.status(500).json(err)
        return res.status(200).json('relationship added')
    })

}

module.exports.removeRelationShip=(req, res)=>{
    console.log('remove relation', req.query.followedId, req.userId)
    const q=`DELETE FROM relationships 
    WHERE followed=? AND follower=?
    `
    const values=[req.query.followedId, req.userId]
    conn.query(q, [...values], (err, data)=>{
        if(err) return res.status(500).json(err)
        return res.status(200).json('relationship removed')
    })

}