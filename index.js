//back-end의 시작점 index.js
//express를 불러옴
const express = require('express')
//express를 사용해서 앱을 만듬
const app = express()
//5000번 포트를 사용함
const port = 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const config = require('./config/key');
// auth 가져오기
const { auth } = require('./middleware/auth')
// user모델 가져오기
const { User } = require('./models/User')

// application/x-www-form-urlencoded 타입을 가져올 수 있음
app.use(bodyParser.urlencoded({extended: true}));
// application/json 타입을 가져올 수 있음
app.use(bodyParser.json());
app.use(cookieParser());


//mongoDB 연결
const mongoose = require('mongoose');
const { json } = require('body-parser');
mongoose.connect(config.mongoURL)
  .then(() => console.log('MongoDB Connected..'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World!2022')
  })

app.post('/api/users/register',(req, res) => {
  
  //회원 가입 할때 필요한 목록들을 client에서 가져오면
  //그것들을 DB에 넣어준다.

  const user = new User(req.body)
  // mongoDB에서 오는 method
  user.save((err, userInfo)=>{
    if(err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })
})

app.post('/api/users/login', (req, res) => {
  // 1. 데이터베이스 안에서 요청된 이메일 찾기
  User.findOne({ email: req.body.email }, (err, user) =>{
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
  // 2. 요청한 이메일이 있다면 비밀번호 확인
  user.comparePassword(req.body.password, (err, isMatch) => {
    // console.log('err',err)
    // console.log('isMatch', isMatch)
    if(!isMatch) 
      return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."})
    
    // 3. 비밀번호까지 같으면 token 생성
    user.generateToken((err, user) => {
      if(err) return res.status(400).send(err);
      // token을 쿠키, 로컬스토리지 등 원하는 곳에 저장한다. 지금은 쿠키에 저장
      res.cookie("x_auth", user.token)
      .status(200)
      .json({ loginSuccess: true, userId: user._id })
    })
  })
  })
  
})

// 로그인 관련 기능 Auth
app.get('/api/users/auth', auth, (req, res) => {
  // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True라는 말
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email:req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id },
    { token: "" },
    (err, user) => {
      if(err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      })
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})