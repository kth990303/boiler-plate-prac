const express=require('express');
const app=express();
const port=3000;

const mongoose=require('mongoose');
mongoose.connect
('mongodb+srv://johnahn:abcd1234@boilerplate.lbu3u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(()=>{
    console.log('MongoDB Connected...');
}).catch(()=>{
    console.log(err);
})

app.get('/', (req, res)=>{
    res.send('Hello world!');
});

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}!`);
});