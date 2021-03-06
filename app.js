const express=require('express');
const bodyParser=require('body-parser');    //for reading the request body
const cors=require('cors');
const mongoose=require('mongoose');
                //const dotENV=require('dotenv');
const api=require('./routes/post_api');
const auth=require('./routes/auth');

                //dotENV.config();
const app=new express();
const db=require('./config/db').database;
mongoose.connect(db,{useNewUrlParser:true, useUnifiedTopology: true})
                .then(console.log("Successful connection established"))
                .catch(err=>console.log("error in DB conncetion"));

const port=process.env.PORT || 3131;

app.use(cors());
app.use(bodyParser.json());

app.use('/api',api);
app.use('/auth',auth);

app.get('/',(req,res)=>
{
    res.json("hello From Server!");
});

app.listen(port,()=>
{
    console.log("server running and ALL SET!",port);
});