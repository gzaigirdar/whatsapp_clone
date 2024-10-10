import  express  from "express";
import dotenv from "dotenv";
import morgan from 'morgan';
import helmet from 'helmet';
import mongoSantitize from 'express-mongo-sanitize'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import routes from './routes/index.js'

import createHttpError from 'http-errors';
// configuring dotenve so it can be used in the project
dotenv.config();
// mongodb variables

const app = express();
// Mogan middleware is a  http logger  and provides more information about http request
// only use it during production
if(process.env.NODE_ENV !== "production"){
    app.use(morgan('dev'))

}
// helmet middleware helps secure the node js app by adding multiple http headers
app.use(helmet());

// express.json helps accept and parse json objects for put requests
// url encoded helps express accept incoming data object as array or strings
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// mongo sanitize adds security to request data 
app.use(mongoSantitize());
//enables cookies
app.use(cookieParser());
// file uplaod to make uploaded file accessiable from request
app.use(fileUpload({useTempFiles:true}));
// use tempfiles creates a temp files and stores them in useTempFiles
// compresses all the response 
app.use(compression());
// cors middleware is used to protect and restrict acces to the server
app.use(cors());
app.use('/api',routes)
app.get('/test',(req,res) => {
   
  res.send('okay status')
   
}) 
// http error handling function middleware, has to be defined at the end
// if theres an error then it will get called it takes err object
app.use(async(err,req,res,next)=>{
    // sends status from the error object or 500 code
    res.status(err.status || 500);
    res.send({
        error:{
            status:err.status || 500,
            message: err.message,
        },
    });
});
export default app;