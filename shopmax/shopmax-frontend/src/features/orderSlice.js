import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createOrder, getOrders, cancelOrder, deleteOrder } from '../api/orderApi'

// 주문하기
export const createOrderThunk = createAsyncThunk('order/createOrder', async (orderData, { rejectWithValue }) => {
    try {
        const response = await createOrder(orderData)
        return response.data.orderId
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || '주문하기 실패')
    }
})

// 전체 주문목록 가져오기
export const getOrdersThunk = createAsyncThunk('order/getOrders', async (data, { rejectWithValue }) => {

})

//주문 취소
export const cancelOrderThunk = createAsyncThunk('order/cancelOrder', async (id, { rejectWithValue }) => {

})

//주문 삭제
export const deleteOrderThunk = createAsyncThunk('order/deleteOrder', async (id, { rejectWithValue }) => {

})

const orderSlice = createSlice({
   name: 'order',
   initialState: {
      orders: [],
      pagination: null,
      loading: true,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      // 주문하기
      builder
         .addCase(createOrderThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createOrderThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(createOrderThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default orderSlice.reducer
