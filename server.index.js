const express=require('express');
const env = require('dotenv');
const app = express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
//impport routes
const routeUser=require('./src/Routes/Auth')
const adminroute=require('./src/Routes/admin/Auth')
const categoryRoutes=require('./src/Routes/category')
const productRoutes=require('./src/Routes/product')
const cartRoutes=require('./src/Routes/AddCart')

// const PORT=5000;

app.use(bodyParser.json());
// app.use(
//     express.urlencoded({ extended: true })
// );
    
// app.use(express.json());
env.config();

// app.use(express.json());

// db connection

const connectdb=async()=>
{
    mongoose.connect(`mongodb+srv://nishitha:sfoNiWJC44pZ8Lt5@cluster0.602gwxp.mongodb.net/Orders`,{ useNewUrlParser: true, useUnifiedTopology: true})
    console.log("connected")
}
// mongoose.connect(`mongodb+srv://nishitha:umW6fbFWfIgEvUTn@cluster0.602gwxp.mongodb.net/test`,{ useNewUrlParser: true, useUnifiedTopology: true}).then(()=>
// {
//     console.log('Database connected successfully')
// })

connectdb();

// middleware
app.use('/backendAPI',routeUser);
app.use('/backendAPI',adminroute);
app.use('/backendAPI',categoryRoutes);
app.use('/backendAPI',productRoutes);
app.use('/backendAPI',cartRoutes);



app.get('/',(req,res,next)=>
{
    res.status(200).json({
        message:"hello i am from the server"
    })
})

// app.use('/backendAPI',routeUser);

//this wll return an empty object because we are nor passing our input. we are sending some data from the api as a payload

app.post('/postdata',(req,res,next)=>
{
    res.status(200).json({
        message:req.body
    })
})



app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`);
})
