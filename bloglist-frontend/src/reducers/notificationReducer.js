import { createSlice } from "@reduxjs/toolkit"

const initialState = { message: '', style: null }
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification(state, action) {
            return action.payload
        },
        clearNotification(state, action) {
            return initialState 
        }
    }
})

export const { addNotification, clearNotification } = notificationSlice.actions

export default notificationSlice.reducer

export const setNotification = (message, style, seconds) => {
    return async dispatch => {
        dispatch(addNotification({message, style}))
        setTimeout(() => {
            dispatch(clearNotification())
        }, seconds * 1000)
    }
}




