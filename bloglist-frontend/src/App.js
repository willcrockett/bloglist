import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { clearUser, initUser } from './reducers/userReducer'
const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  /* ------------------------------- State Hooks ------------------------------ */
	// const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()
  /* ------------------------------ Effect Hooks ------------------------------ */
	useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initUser())
  }, [])

  const blogs = useSelector(state => state.blogs)

  
 /* ------------------------------ Blog Handlers ----------------------------- */
  /* ------------------------------ User Handlers ------- ---------------------- */

  /* ---------------------------- Rendering Helpers --------------------------- */
  
  //blogs.sort((b1, b2) => b2.likes - b1.likes)
  const renderBlogs = () => {
    return (
      <div>
        <h2>blogs</h2>
        <form onSubmit={() => dispatch(clearUser())}>
          {user.name} logged in {' '}
          <button type="submit">logout</button>
        </form>	
        <Toggleable buttonLabel={'Create New Blog'} ref={blogFormRef}>
          <BlogForm />
        </Toggleable>
        <br></br>
        {blogs.map(blog =>
        <Blog key={blog.id} 
          blog={blog} 
          curr_username={user.username}
          />

      )}
      </div>
    )
  }
  
  return (
    <div>
      <Notification />
      { user !== null ?
        renderBlogs() :
        <LoginForm />
      }
      
    </div>
  )
}

export default App
