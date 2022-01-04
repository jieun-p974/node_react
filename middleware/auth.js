const { User } = require("../models/User");

let auth = (req, res, next) => {
    // 인증 처리를 하는 곳

    // 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;
    
    // 토큰을 복호화 한후 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true })
        
        // req에 값을 넣음으로써 토큰과 유저의 정보를 사용할 수 있게 됨
        req.token = token;
        req.user = user;
        // next하는 이유는 미들웨어에서 다음으로 넘어갈 수 있게 하기 위해서
        next();
    })

    // 유저가 있으면 인증 Okay

    // 유저가 없으면 인증 No
}

module.exports = { auth };