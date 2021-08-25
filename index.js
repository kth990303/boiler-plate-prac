const express=require('express');
const app=express();
const port=5000;
const cookieParser=require('cookie-parser');
const { auth }=require('./server/middleware/auth')
const { User }=require("./server/models/User");
const config=require('./server/config/key');

app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());
app.use(cookieParser());

const mongoose=require('mongoose');
const { json } = require('body-parser');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(()=>{
    console.log('MongoDB Connected...');
}).catch((err)=>{
    console.log(err);
})

app.get('/', (req, res)=>{
    res.send('Hello world!');
});

app.get('/api/hello', (req, res)=>{
    res.send("안녕하세요~");
});

app.post('/api/users/register', (req, res)=>{
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

app.post('/api/users/login', (req, res)=>{
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

// auth라는 미들웨어를 추가
// request를 받으면 call back function 호출 전에 middleware실행
app.get('/api/users/auth', auth, (req, res)=>{
    res.status(200).json({
        _id: req.user._id, 
        isAdmin: req.user.role===0?false:true, 
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    });
});

app.get('/api/users/logout', auth, (req, res)=>{
    console.log(req.user);
    User.findOneAndUpdate({_id:req.user._id}, {
        token: ""
    }, (err, user)=>{
        if(err) return res.json({
            success: false,
            err
        });
        return res.status(200).send({
            success: true
        });
    });
})

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}!`);
});