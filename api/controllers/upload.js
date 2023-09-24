module.exports.uploadFile=(req, res)=>{
    console.log('file uploaded',req.file.path)
    return res.status(200).json(req.file.filename)
}