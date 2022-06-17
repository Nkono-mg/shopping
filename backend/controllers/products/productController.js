exports.getProducts = (req, res, next)=>{
    return res.status(200).json({
        success: true,
        message: "Get all products in database"
    })
}