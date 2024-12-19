const passport = require('passport')
const local = require('./localStrategy')
const User = require('../models/user')

module.exports = () => {
    // 직렬화 (serializeUser)
    // 로그인 성공 후 사용자 정보 => 세션에 저장
    passport.serializeUser((user, done) => {
        // 사용자 ID만 세션에 저장 (이때, user는 로그인 성공시의 사용자 객체)
        done(null, user.id)
        // [done(1,2)] 1: Error / 2: 세션에 저장할 사용자 식별자 (일반적으로 user.id)
    })

    // 역직렬화 (deserializeUser)
    // 세션에 저장된 사용자 ID를 바탕으로 사용자 정보 조회
    passport.deserializeUser((id, done) => {
        User.findOne({
            where: { id },
            include: [
                {
                    model: User,
                    as: 'Followers',
                    attributes: ['id', 'nick', 'email']
                },
                {
                    model: User,
                    as: 'Followings',
                    attributes: ['id', 'nick', 'email']
                }
            ]
        })
            .then((user) => done(null, user)) // 사용자 정보 복구 후 done()으로 사용자 정보 반환
            .catch((error) => done(error)) // 에러 발생 시 done()으로 에러 반환
    })

    // 로컬 전략(Local Strategy) 초기화
    local() // LocalStrategy.js 파일의 함수를 실행하여 Passport에 local 전략 추가
}


 /*     
            include: [
                {
                    model: User,
                    attributes: ['id', 'nick'], // 사용자의 팔로워 정보(id, nick)만 캐치
                    as: 'Followers', // 관계 별칭 (User 모델에서 관계를 미리정의해야한다.)
                },
                {
                    model: User,
                    attributes: ['id', 'nick'], // 사용자의 팔로잉 정보(id, nick)만 가져온다.
                    as: 'Followings', // 관계 별칭 (User 모델에서 관계를 미리 정의해야한다.)
                },
            ],
            */
