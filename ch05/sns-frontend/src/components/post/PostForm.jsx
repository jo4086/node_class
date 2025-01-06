// sns-frontend/src/components/post/PostForm.jsx

import React, { useState, useCallback, useMemo } from 'react'
import { TextField, Button, Box } from '@mui/material'

// 등록, 수정 폼 컴포넌트
const PostForm = ({ onSubmit, initialValues = {} }) => {
    const [imgUrl, setImgUrl] = useState(initialValues.img ? process.env.REACT_APP_API_URL + initialValues.img : '') // 이미지 경로(파일명 포함)
    // const [imgUrl, setImgUrl] = useState('')
    const [imgFile, setImgFile] = useState(null) // 이미지 파일 객체
    const [content, setContent] = useState(initialValues.content || '') // 게시물 내용
    const [hashtags, setHashtags] = useState(
        initialValues.Hashtags
            ? initialValues.Hashtags.map((tag) => `#${tag.title}`).join(' ') //해시태그 문자열을 만들어줌
            : '',
    ) // 해시태그 문자열로 만들어줌) : ' '

    /** <input type="file" /> : input의 타입='file'은  FileList를 객체를 자동으로 생성 및 반환
     ** [e.target.files]: 업로드한 파일 객체를 배열 형태로 가져옴
     * File1, File2... 파일 객체는 업로드한 파일의 정보를 소유
     * e.target.files = [File1, File2, File3, ...]
     *
     * File을 하나만 업로드 하여도 구조의 생성은 똑같다
     * ▼ result
     * e.target.files = [File1]
     **/

    // 이미지 파일 미리보기
    const handleImageChange = useCallback((e) => {
        // e.target.files: 파일 객체

        const file = e.target.files && e.target.files[0] // 첫번째 이미지만 미리보여줌
        if (!file) return // 파일이 없을 경우 함수 종료

        setImgFile(file) // 업로드한 파일 객체를 state에 저장
        console.log('file: ', file)
        /** [FileReader()]: 자바스크립트에서 제공하는 함수
         * file을 비동기적으로 읽을 수 있도록 해주는 객체
         * 주로 이미지 미리보기 or 텍스트 읽기 등에 사용
         *
         * [.onload()]: 파일을 성공적으로 읽은 후에 실행되는 함수
         **/

        const reader = new FileReader()

        //dog.jpg => dta.image/jpg;base64, idfsfdfsfsfsdfsffhjghj...
        reader.readAsDataURL(file) //업로드한 파일을 Base64 URL로 변환 (이미지 미리보기에 주로 사용)

        reader.onload = (event) => {
            setImgUrl(event.target.result) // data.image/jpg;base64, idfsiffsfsfsdfsffhjghj.. (Base64 URL로 변환 형태의 이미지 URL이 들어있음)
        }
    }, [])

    // 작성한 내용 전송
    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault()

            if (!content.trim()) {
                alert('내용을 입력하세요.')
                return
            }

            // if (!hashtags.trim()) {
            //     alert('해시태그를 입력하세요.')
            //     return
            // }

            if (!imgFile && !initialValues.id) {
                alert('이미지 파일을 추가하세요.')
                return
            }

            const formData = new FormData()
            if (imgFile) {
                const encodedFile = new File([imgFile], encodeURIComponent(imgFile.name), { type: imgFile.type })
                formData.append('img', encodedFile) //이미지 파일 추가
                console.log('imgFile: ', encodedFile)
            }
            formData.append('content', content) // 게시물 내용 추가
            formData.append('hashtags', hashtags) // 해시태그 추가

            // if (imgFile) formData.append('img', imgFile) // 이미지 파일 추가 ... 글씨깨짐
            onSubmit(formData) // FormData 객체를 그대로 전송
        },

        [content, hashtags, imgFile, onSubmit, initialValues.id],
    )

    const submitButtonLabel = useMemo(() => (initialValues.id ? '수정하기' : '등록하기'), [initialValues.id])

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }} encType="multipart/form-data">
            {/* 이미지 업로드 필드 */}
            <Button variant="contained" component="label">
                이미지 업로드
                <input type="file" name="img" accept="image/*" hidden onChange={handleImageChange} />
            </Button>

            {imgUrl && (
                <Box mt={2}>
                    <img src={imgUrl} alt="업로드 이미지 미리보기" style={{ width: '400px' }} />
                </Box>
            )}

            {/* 게시물 내용 입력 필드 */}
            <TextField label="게시물 내용" variant="outlined" fullWidth multiline rows={4} value={content} onChange={(e) => setContent(e.target.value)} sx={{ mt: 2 }} />

            {/* 해시태그 입력 필드 */}
            <TextField label="해시태그 (# 구분)" variant="outlined" fullWidth value={hashtags} onChange={(e) => setHashtags(e.target.value)} placeholder="예: #여행 #음식 #일상" sx={{ mt: 2 }} />

            {/* 등록 / 수정 버튼 */}
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                {submitButtonLabel}
            </Button>
        </Box>
    )
}
export default PostForm

/*
initialValues = {
    id: 1,
    content: '하이',
    img: '/dog41241234',
    createdAt: 2024-10-10 02:10:10,
    updatedAt: 2024-10-10 04:01:20,
    User: [...],
    Hashtag: [...]
}
*/
