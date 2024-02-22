import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'
import blogService from '../services/blogs'
const userSlice = createSlice({
    name: 'user',
    initialState: {user: null, username: null, token: null},
    reducers: {
        setUser(state, action) {
            const user = action.payload
            window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
            return user
        },
        clearUser(state, action) {
            window.localStorage.removeItem('loggedBloglistUser')
            return null
        },
        initUser(state, action) {
            const userJSON = window.localStorage.getItem('loggedBloglistUser')
            if (userJSON) {
                const user = JSON.parse(userJSON)
                blogService.setToken(user.token)
                return user
            } else {
                return null
            }
        }
    }
})
export const { setUser, clearUser, initUser } = userSlice.actions

export default userSlice.reducer

export const login = (userObject) => {
    return async dispatch => {
        try {
            const user = await loginService.login(userObject)
            dispatch(setUser(user))
        } catch (e) {
            if (e.response.status === 401) {
                dispatch(setNotification('wrong username and/or password', 'error', 5))
            }
        }
    }
}

