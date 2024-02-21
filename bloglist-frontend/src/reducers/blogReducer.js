import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            console.log(state)
            return action.payload
        },
        appendBlog(state, action) {
            state.push(action.payload)
        }

    // TODO: add action for creating a new blog
    }
})


export const { setBlogs, appendBlog } = blogSlice.actions

export default blogSlice.reducer

export const initializeBlogs = () => {
    return async dispatch => {
        console.log('initialize blogs')
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.create(blog)
        dispatch(appendBlog(newBlog))
    }

}