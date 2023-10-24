const mongoose=require('mongoose')


mongoose.connect(process.env.BASE_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("____mongodb atlas connected_______");
}).catch(()=>{
    console.log("______mbd atlas not connected______");
})