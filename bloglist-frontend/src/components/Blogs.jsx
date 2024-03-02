import { useDispatch, useSelector } from "react-redux"
import { clearUser } from "../reducers/userReducer"
import Blog from "./Blog"
import BlogForm from "./BlogForm"
import Notification from "./Notification"
import { useRef } from "react"
const BlogList = () => { 
    const blogs= useSelector(({ blogs }) => blogs)
    const user = useSelector(({ user } ) => user)
    const dispatch = useDispatch()
    const blogFormRef = useRef()
    return (
      <div>
        <Notification />
        <h2>blogs</h2>
        <div>
          
          <h2>blogs</h2>
          <form onSubmit={() => dispatch(clearUser())}>
            {user.name} logged in {' '}
            <button type="submit">logout</button>
          </form>	
          <BlogForm blogFormRef={blogFormRef} />
          
          
          {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} /> 
          )}
        </div>
      </div>
    )
}


export default BlogList