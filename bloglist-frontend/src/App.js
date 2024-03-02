import { useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { clearUser, initUser } from './reducers/userReducer'
import Blogs from './components/Blogs'
import Users from './components/Users'
import { BrowserRouter as Router,
  Routes, Route, Link, useNavigate, Navigate
} from 'react-router-dom'
import { initializeUsers } from './reducers/usersReducer'

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
    dispatch(initializeUsers())
  }, [])

  
  //blogs.sort((b1, b2) => b2.likes - b1.likes)
  
  return (

    <Router>
        <div>
          <h2>blogs</h2>
          {user 
          ? (
            <div>
              <em>{user.name} logged in</em>
              <button onClick={() => dispatch(clearUser())}>logout</button>
            <BlogForm blogFormRef={blogFormRef} />
            </div>
          )
          : <Navigate replace to="/login" />  
          }
        </div>
        <div>
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/login" element={user === null ? <LoginForm /> : <Navigate replace to="/" />} />
          <Route path="/users" element={<Users />} /> 
        </Routes>
      </div>
     
    </Router>
  )
}


export default App
