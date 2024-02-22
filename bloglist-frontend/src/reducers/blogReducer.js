import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            // const blogs = action.payload
            // blogs.sort((b2, b1) => b2.blogs - b1.blogs)
            return action.payload 
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
        updateBlog(state, action) {
            console.log(action.payload)
            const id = action.payload.id
            const newState = state.map(b => b.id === id ? action.payload : b)
            // newState.sort((b2, b1) => b2.likes = b1.likes)
            return newState 

        },
        removeBlog(state, action) {
            return state.filter(b => b.id !== action.payload)
        }

    // TODO: add action for creating a new blog
    }
})


export const { setBlogs, appendBlog, updateBlog, removeBlog } = blogSlice.actions

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

export const likeBlog = (id) => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        console.log('like blog')
        const blogToLike = blogs.find(b => b.id === id)
        const likedBlog = await blogService.update(id, {...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id})
        dispatch(updateBlog(likedBlog))
    }  
}

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch(removeBlog(id))
    }
}