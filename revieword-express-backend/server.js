require('dotenv').config();
const express=require('express');
const connectDb=require('./config/dbConnection')
const cors=require("cors");
const cookieParser=require('cookie-parser')
const errorHandler=require('./middleware/errorHandler')

    

  const corsOptions = {
    origin: ["http://localhost:3000","https://cheery-mermaid-a47c44.netlify.app"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: 'true',
  };


  const app=express();
  connectDb();
  const port=process.env.PORT || 8000
  

  //MIDDLEWARE AND COOKIE FUNCTIONALITY
  app.use(errorHandler)
  app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      next();
    });
    
  app.use(express.json())
  app.use(cors(corsOptions))
  app.use(cookieParser())



  //ROUTES
  app.use('/users', require('./routes/userRoutes'))
  app.use('/essays', require('./routes/essayRoutes'))

  app.listen(port,()=>{
      console.log(`Server listening on port ${port}`)
})






