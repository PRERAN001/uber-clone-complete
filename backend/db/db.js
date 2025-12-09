const mongoose=require('mongoose')
function connecttodb(){
    mongoose.connect(process.env.dbconnectionstring
       
    ).then(()=>{console.log("connected to db")}).catch((err)=>{
        console.log('error connecting to database',err)
    })
}
module.exports=connecttodb    ;