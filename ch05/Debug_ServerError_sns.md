## Debug Log: 게시물 업로드 실패

-   statusCode: `500 Internal Server Error`
    -   서버 내부에서 오류가 발생때 반환
-   **경로**: sns-api/routes/post.js
-   **원인코드**

    ```diff
    const hashtags = req.body.hashtags.match(/#[^\s#]*/g)

    if (hashtags) {
        const result = await Promise.all(
    -1      hashtags.map((tag) => hashtags.findOrCreate({
    -2          where: { titie: tag.slice(1) }
                }))
            )
    }
    ! 1. 오류코드
    hastags.map((tag) => hashtags.findOrCreate())
    => findOrCreate는 Sequelize의 모델명에서 가져와 hashtags의 맵 순환을 해야함
    +  수정코드
    hashtags.map((tag) => [Hashtag].findOrCreate())

    ! 2. 오류코드
    where: { titie: tag.slice(1) }
    => title을 titie로 오타
    +  수정코드
    where: { [title]: tag.slice(1) }
    ```

## Debug Log: 팔로우 정보 조회 실패

-   **Error_Method**: `GET`
-   **Error_Url**: `http://localhost:8000/page/profile/7`
-   **Status_Code**: `500`
-   **Response_Status_Message**: `Internal Server Error`

-   **원인**: 백엔드 `routes`설정 코드의 오타
-   **백앤드 경로**: `sns-api/routes/page.js`
-   **에러 코드**
    ```diff
      const user = await User.findOne({
            where: { id: userId },
            attributes: ['id', 'nick', 'email', 'createdAt', 'updatedAt'],
            include: [
                {
                    model: User,
    -               as: Followers,
                    attributes: ['id', 'nick', 'email'],
                },
                {
                    model: User,
    -               as: Followings,
                    attributes: ['id', 'nick', 'email'],
                }
            ]
        })
    ! 원인
    시퀄라이즈의 as, 별명을 붙이는 부분에 작은따옴표 처리를 하지 않음
    + 수정 코드
    as: 'Followers',
    as: 'Followings',
    ```

### 에러 처리 흐름

-   **_Axios 에러 로그_**:

    -   **_at_**: `src/api/snsApi.js:161`
    -   **_console.log_**: `▶ API Request 오류: Request failed with status code 500`
    -   **_Error_code_**

    ```javascript
    catch (error) {
        console.error(`API Request 오류: ${error.message}`)
        throw error
    }
    ```

-   **_React 컴포넌트 에러로그_**:

    -   **_at_**: `src/components/page/MyProfile.jsx:32`
    -   **_console.log_**: `▶ 사용자 정보를 가져오는 중 에러 발생: 팔로우 정보를 조회하는데 오류가 발생하였습니다.`
    -   **_발생 코드_**

    ```javascript
    .catch((error) => {
        console.error('사용자 정보를 가져오는 중 에러 발생: ', error)
    })
    ```

| **구분**            | **위치**                               | **로그 메시지**                                                                          |
| :------------------ | :------------------------------------- | :--------------------------------------------------------------------------------------- |
| Axios 에러 로그     | `src/api/snsApi.js:161`                | `▶ API Request 오류: Request failed with status code 500`                                |
| React 컴포넌트 로그 | `src/components/page/MyProfile.jsx:32` | `▶ 사용자 정보를 가져오는 중 에러 발생: 팔로우 정보를 조회하는데 오류가 발생하였습니다.` |
