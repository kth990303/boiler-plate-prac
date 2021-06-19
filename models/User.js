const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:{
        type: String,
        maxlength: 50,
    },
    email:{
        type: String,
        // space bar를 없애준다.
        trim: true,
        // 중복을 허용하지 않는다.
        unique: 1
    },
    password: {
        type: String,
        minlength: 5,
    },
    lastname:{
        type:String,
        maxlength:50,
    },
    role:{
        type:Number,
        // 기본값
        default: 0,
    },
    image: String,
    token:{
        type:String,
    },
    tokenExp:{
        type: Number,
    }
});

const User=mongoose.model('User', userSchema);

// 다른 파일에서도 이 모델을 쓸 수 있도록
module.exports={}