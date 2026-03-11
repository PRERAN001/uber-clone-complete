const {getlatandlon}=require("../services/maps.service")
module.exports.senddetails=async(req,res)=>{
    try{
        const data=req.body.location
        const latlon=await getlatandlon(data)
        return res.status(200).json({
            message:"location sent",
            latlon
        })

    } catch (error) {
        return res.status(500).json({
            message:"internal server error",
            error:error.message
        })
    }
}
