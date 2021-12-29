//back-end의 시작점 index.js
//express를 불러옴
const express = require('express')
//express를 사용해서 앱을 만듬
const app = express()
//5000번 포트를 사용함
const port = 5000
const bodyParser = require('body-parser')
const config = require('./config/key');
// user모델 가져오기
const { User } = require('./models/User')

// application/x-www-form-urlencoded 타입을 가져올 수 있음
app.use(bodyParser.urlencoded({extended: true}));
// application/json 타입을 가져올 수 있음
app.use(bodyParser.json());


//mongoDB 연결
const mongoose = require('mongoose')
mongoose.connect(config.mongoURL)
  .then(() => console.log('MongoDB Connected..'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World!2022')
  })

app.post('/register',(req, res) => {
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



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})