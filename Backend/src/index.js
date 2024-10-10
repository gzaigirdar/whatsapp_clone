
import app from "./app.js";
import logger from "./configs/logger.js";
import mongoose from 'mongoose'


// app is imported from app.js



const port = process.env.PORT || 7000;
const DBURL= process.env.DBURL;

// conecting to the db
mongoose.connect(DBURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    logger.info('the db is connected')
}) 
// handling mongodb error
mongoose.connection.on('error',(err)=>{
    logger.error(`db error:${err}`);
    process.exit(1);
})
// mongodb debug mode enabled in development 

if(process.env.NODEENV !== "production"){
    mongoose.set("debug",true);
}
app.listen(port,() => {

    // gotta use `ticks` instead of 'qoute' otherwise cannot pass variable in js string

    logger.info(`server is listening ${port}`);
   
    
});


// handling closing  of the app
const exitHandler = () =>{
    if(app){
        logger.info("server is closed");
        process.exit(1);
    }
    else{
        process.exit(1);
    }
}
// handling http errors
const expectedErrorhandler = (error) =>{
    logger.error(error)
    // using exithandler function 
    exitHandler();
}

process.on('uncaughtException',expectedErrorhandler);
process.on('unhandledRejection',expectedErrorhandler);
// sigterm if operating system signal the app to close 
process.on("SIGTERM",()=>{
    if(app){
        logger.info("server is closed");
        process.exit(1);
    }
      
})