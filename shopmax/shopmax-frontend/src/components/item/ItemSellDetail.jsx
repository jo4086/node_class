import { Box, Typography, Button, Alert, CardMedia } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { NumberInput } from '../../styles/NumberInputBasic'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import { fetchItemByIdThunk } from '../../features/itemSlice'
import { createOrderThunk } from '../../features/orderSlice'
import { formatWithComma } from '../../utils/priceSet'

import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function ItemSellDetail() {
    const { id } = useParams() // item의 id
    const dispatch = useDispatch()
    const { item, error, loading } = useSelector((state) => state.items)
    const [count, setCount] = useState(1) // 수량 저장 state
    const [orderPrice, setOrderPrice] = useState(0)
    const [orderComplete, setOrderComplete] = useState(false) // 주문 완료 상태

    // 상품 데이터 불러오기
    useEffect(() => {
        dispatch(fetchItemByIdThunk(id))
    }, [dispatch, id, orderComplete])
    
    // 수량 증가 => 총 가격 계산
    // 처음 상세 페이지 로드시 수량이 1개일때의 총 가격상품도 보여주기위해 useEffect를 사용
    useEffect(() => {
        if (item) {
            // 상품이 존재?
            setOrderPrice(item.price * count) // 가격 * 수
        }
    }, [item, count])

    // 수량 증가
    const handleQuantityChange = useCallback((event, value) => {
        setCount(value)
    }, [])

    // 상품 주문
    const handleBuy = useCallback(() => {
        // orderData = { items: [{ itemId: 1, count: 2 }, { itemId: 2, count: 1 }] } 형태
        dispatch(createOrderThunk({
            items: [
                {
                    itemId: `${id}`, // 상품 id
                    count,
                }
            ]
        })
        )
        .unwrap()
            .then(() => {
                alert('주문이 완료되었습니다.')
                setOrderComplete(true) // state를 바꿔서 재랜더링 실행 => 재고 갱신
            })
            .catch((error) => {
                console.error('주문 에러:', error)
                alert(`주문 실패: ${error}`)
            })
    }, [dispatch, count, id])

    if (loading) {
        return null //아무것도 보여주지 X
    }

    if (error) {
        return (
            <Typography variant="body1" align="center" color="error">
                에러 발생: {error}
            </Typography>
        )
    }

    return (
        <>
            {item && (
                <Box sx={{ padding: '20px' }}>
                    {/* 위쪽 상세 */}
                    <Grid
                        container
                        spacing={4}
                        sx={{ justifyContent: 'center', alignItems: 'center' }} // 추가된 스타일
                    >
                        <Grid container spacing={10}>
                            {/* 왼쪽 이미지 */}
                            <Grid xs={12} md={6}>
                                <CardMedia component="img" image={`${process.env.REACT_APP_API_URL}${item.Imgs.filter((img) => img.repImgYn === 'Y')[0].imgUrl}`} alt={item.itemNm} sx={{ width: '450px', borderRadius: '8px' }} />
                            </Grid>

                            {/* 오른쪽 상세 정보 */}
                            <Grid xs={12} md={6}>
                                <Typography variant="h4" gutterBottom>
                                    <LocalMallIcon sx={{ color: '#ffab40', fontSize: '32px' }} />
                                    {item.itemNm}
                                </Typography>

                                <Typography variant="h6" gutterBottom>
                                    가격: {formatWithComma(String(item.price))}원
                                </Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    현재 재고: {item.stockNumber}개
                                </Typography>

                                {item.itemSellStatus === 'SOLD_OUT' ? (
                                    <Alert severity="error">품절</Alert>
                                ) : (
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
                                        <NumberInput aria-label="Demo number input" value={count} placeholder="수량" min={1} max={item.stockNumber} onChange={handleQuantityChange} />
                                        <Typography variant="h6">총 가격: {orderPrice.toLocaleString('ko-KR')} 원</Typography>
                                        <Button variant="contained" color="primary" onClick={handleBuy}>
                                            구매하기
                                        </Button>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* 상세 이미지 */}
                    <Box sx={{ marginTop: '180px' }}>
                        <Typography variant="h5" gutterBottom>
                            상세 정보
                        </Typography>
                        <Typography variant="body1" gutterBottom sx={{ mt: 4, mb: 5 }}>
                            {item.itemDetail}
                        </Typography>
                        <Grid container spacing={2}>
                            {item.Imgs.map((img, index) => (
                                <Grid xs={12} sm={6} md={4} key={index}>
                                    <CardMedia component="img" image={`${process.env.REACT_APP_API_URL}${img.imgUrl}`} alt={`상세 이미지 ${index + 1}`} sx={{ width: '100%', borderRadius: '8px' }} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            )}
        </>
    )
}

export default ItemSellDetail
