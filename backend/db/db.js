const mongoose=require('mongoose')
function connecttodb(){
    mongoose.connect(process.env.dbconnectionstring
       
    ).catch(()=>{
        // no-op
    })
}
module.exports=connecttodb    ;