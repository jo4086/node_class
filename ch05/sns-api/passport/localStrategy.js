const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/user')

// 로그인 시 사용자 정보를 DB에 조회하고 비밀번호 존재 여부와 비밀번호를 비교,, passport에 결과를 전달
module.exports = () => {
    // LocalStrategy({first}, second)
    passport.use(
        new LocalStrategy(
            {
                // input 태그에서 name으로 사용하는 이름 지정
                usernameField: 'email', // req.body.email = 'test@test.com'
                passwordField: 'password', // req.body.password = '1111'
            },
            // 실제 인증 로직
            async (email, password, done) => {
                try {
                    // 1. Email로 사용자 조회
                    const exUser = await User.findOne({ where: { email } })
                    if (exUser) {
                        // 1-1 Email에 해당하는 사용자가 있는 경우
                        // 1-1.1, 비밀번호 비교, ( 로그인비밀번호, DB비밀번호 ), 회원가입시 bcrypt로 암호화를 했기에 입력 패스워드도 암호화를 통해 비교해야함
                        const result = await bcrypt.compare(password, exUser.password)

                        if (result) {
                            // 1-1.2, 비밀번호 일치시 사용가 객체를 passport에 반환
                            done(null, exUser)
                        } else {
                            // 1-1.3, 비밀번호 불일치시 message를 passport에 반환
                            done(null, false, { message: '비밀번호가 일치하지 않습니다.' })
                        }
                    } else {
                        // Email에 해당하는 사용자가 없는 경우
                        done(null, false, { message: '가입되지 않는 회원입니다.' })
                    }
                } catch (error) {
                    console.error(error)
                    done(error) // passport에 에러객체 전달 => 이후 passport에서 에러 핸들러(미들웨어)로 전달
                }
            },
        ),
    )
}

/*

const exUser = await User.findOne( { where: {email} } )

if (!exUser) {
    return done(null, false, { message: '가입되지 않은 회원'})
}

const matchPwd = await bcrypt.compara(password, exUser.password)

if (!matchPwd) {
    return doen(null, false, { message: '비밀번호 불일치'})
}

return doen(null, exUser)

*/

/*

const exUser = await User.findOne({ where: { email } })

if (exUser) {
    const result = await bcrypt.compara(password, exUser.password)

    if (result) {
        doen(null, exUser)

    } else {
        done(null, false, { message: '비밀번호가 일치하지 않습니다.' })
    }
    
} else {
    done(null, false, { message: '가입되지 않는 회원입니다.' })
}

*/
