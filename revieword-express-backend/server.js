require('dotenv').config();
const express=require('express');
const connectDb=require('./config/dbConnection')
const cors=require("cors");
const cookieParser=require('cookie-parser')
const helmet=require('helmet')
const errorHandler=require('./middleware/errorHandler')

const corsOptions = {
    origin: 'https://cheery-mermaid-a47c44.netlify.app', // Replace with your React frontend URL
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
app.use(helmet())




// app.use('/essays', require('./routes/essayRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use('/essays', require('./routes/essayRoutes'))

app.listen(port,()=>{
    console.log(`Server listening on port ${port}`)
})