const express=require('express');
const app=express();
const port=3000;
const cookieParser=require('cookie-parser');
const { User }=require("./models/User");
const config=require('./config/key');

app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());

const mongoose=require('mongoose');
mongoose.connect(config.mongoURI, {
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

app.post('/register', (req, res)=>{
    // 회원가입할 때 필요한 정보들을 
    // client에서 가져오면
    // 그것들을 db에 넣어준다.
    const user=new User(req.body);
    user.save((err, doc)=>{
        if(err) return res.json({
            success: false, err
        });
        return res.status(200).json({
            success: true
        });
    });
});

app.post('/login', (req, res)=>{
    // 요청된 이메일을 db에서 찾는다.
    User.findOne({email: req.body.email}, (err, user)=>{
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "Unvalid email"
            });
        }
        // 요청된 이메일이 db에 있다면 비밀번호 일치여부 확인
        user.comparePassword(req.body.password, (err, isMatch)=>{
            if(!isMatch)
                return res.json({
                    loginSuccess:false,
                    message:"Wrong password"
                });
            // 일치 시, 토큰 생성
            user.generateToken((err, user)=>{
                if(err) return res.status(400).send(err);
                // 토큰을 쿠키에 저장
                res.cookie("x_auth", user.token)
                .status(200)
                .json({
                    loginSuccess: true,
                    userId: user._id
                });
            });
            
        });
    });
    
});

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}!`);
});