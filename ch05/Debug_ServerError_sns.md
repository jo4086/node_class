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

-   **Error_Metgod**: `GET`
-   **Error_Url**: `http://localhost:8000/page/profile/7`
-   **Status_Code**: `500`
-   **Response_Status_Message**: `Internal Server Error`

### _에러 처리 흐름_

-   **_Axios 에러 로그_**:

    ```plaintext

    API Request 오류: Request failed with status code 500

    ```
