//back-end의 시작점 index.js
//express를 불러옴
const express = require('express')
//express를 사용해서 앱을 만듬
const app = express()
//5000번 포트를 사용함
const port = 5000
//mongoDB 연결
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://dbUser:1234@cluster0.xuhf2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
   
}).then(() => console.log('MongoDB Connected..'))
  .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})