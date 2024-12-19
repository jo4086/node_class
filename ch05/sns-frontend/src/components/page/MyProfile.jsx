import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileIdThunk, getProfileThunk } from '../../features/pageSlice'
import { followUserThunk } from '../../features/userSlice'

const MyProfile = ({ auth }) => {
    const { id } = useParams()
    const [followers, setFollowers] = useState(0) // 팔로워 수
    const [followings, setFollowings] = useState(0) // 팔로잉 수
    const [follow, setFollow] = useState(false) // 팔로우 여부

    // const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.page)

    const fetchProfileData = useCallback(async () => {
        if (id) {
            dispatch(getProfileIdThunk(id)) // 다른 사람 프로필 정보
                .unwrap() // Thunk의 결과를 추출
                .then((result) => {
                    setFollowers(result.Followers.length)
                    setFollowings(result.Followings.length)
                })
                .catch((error) => {
                    console.error('사용자 정보를 가져오는 중 에러 발생: ', error)
                    alert('사용자의 정보 가져오기를 실패했습니다.', error)
                })
        } else {
            dispatch(getProfileThunk()) // 내 정보
                .unwrap() // Thunk의 결과를 추출
                .then((result) => {
                    setFollowers(result.Followers.length)
                    setFollowings(result.Followings.length)
                })
                .catch((error) => {
                    console.error('사용자 정보를 가져오는 중 에러 발생: ', error)
                    alert('사용자의 정보 가져오기를 실패했습니다.', error)
                })
        }
    }, [dispatch, id])

    useEffect(() => {
        fetchProfileData()
    }, [fetchProfileData, follow])

    const onClickFollow = useCallback(
        (id) => {
            dispatch(followUserThunk(id))
                .unwrap()
                .then(() => {
                    alert('팔로우 되었습니다!')
                    setFollow((prev) => !prev) // follow 상태true로 변경
                })
                .catch((error) => {
                    console.error('팔로우 중 실패: ', error)
                    alert('팔로우를 실패했습니다.', error)
                })
        },
        [dispatch],
    )

    return (
        <>
            {user && (
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                            {user.email}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {user.nick}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>자기소개</Typography>
                        <Typography variant="body2">
                            {followers} Followers &nbsp;&nbsp;&nbsp; {followings} Followings
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ p: 2 }}>
                        <Button
                            variant="contained"
                            onClick={() => onClickFollow(`${user.id}`)} // follow 실행
                            // 내 페이지 이거나(메뉴바에서 이름을 클릭한 경우) || 로그인한 사람의 id와 내 페이지의 path 파라메터 :id가 같거나(게시물에서 내 이름을 클릭한 경우) || 이미 팔로우를 한 사용자인 경우(로그인 한 사람이 마이페이지 사람을 팔로우 했는지 찾음)
                            /*
                      마이페이지의 사람을 팔로우한 사람의 데이터
                      user.Followers = [
                        {id: 1, nick: '하서'..}
                        {id: 2, nick: '지은'..}
                      ]
                      
                      f.id = 마이페이지의 사람을 팔로우한 사람의 id
                      auth.id = 로그인한 사람의 id 
                     
                     */
                            disabled={!id || String(auth.id) === String(id) || user.Followers.filter((f) => f.id === auth.id).length > 0 ? true : false}>
                            Follow
                        </Button>
                    </CardActions>
                </Card>
            )}
        </>
    )
}

export default MyProfile

/*
    const fetchProfileData = useCallback(async () => {
        if (id) {
            try {
                // 1. 게시물의 이름을 클릭해서 들어온 경우
                await dispatch(getProfileIdThunk(id)).unwrap()
                await setFollowers()
                navigate(`/my/${id}`)
            } catch (error) {
                console.error('사용자 정보를 가져오는 중 에러 발생: ', error)
                alert('사용자의 정보 가져오기를 실패했습니다.', error)
            }
        } else {
            try {
                // 2. navbar를 이름을 클릭해서 들어온 경우
                await dispatch(getProfileThunk()).unwrap()
                navigate(`/my`)
            } catch {
                console.error('사용자 정보를 가져오는 중 에러 발생: ', error)
                alert('사용자의 정보 가져오기를 실패했습니다.', error)
            }
        }
    }, [])

*/
