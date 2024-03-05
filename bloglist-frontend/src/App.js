import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { clearUser, initUser } from './reducers/userReducer'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import Notification from './components/Notification'
import { BrowserRouter as Router,
  Routes, Route, useMatch, Link, Navigate
} from 'react-router-dom'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)
  /* ------------------------------- State Hooks ------------------------------ */
	// const [blogs, setBlogs] = useState([])
  /* ------------------------------ Effect Hooks ------------------------------ */
	useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initUser())
    dispatch(initializeUsers())
  }, [])
  const matchUser = useMatch('/users/:id')
  const selectedUser = matchUser ? users.find(u => u.id === String(matchUser.params.id)) : null 

  const matchBlog = useMatch('/blogs/:id')
  const selectedBlog = matchBlog ? blogs.find(b => b.id === String(matchBlog.params.id)) : null 
  //blogs.sort((b1, b2) => b2.likes - b1.likes)
  
  return (
      <>
        <Menu /> 
        <Notification />
        <h2>blog app</h2>
        <div>
          <Routes>
            <Route path="/" element={<Blogs />} />
            <Route path="/blogs/:id" element={<Blog blog={selectedBlog} />} />
            <Route path="/login" element={user === null ? <LoginForm /> : <Navigate replace to="/" /> } />
            <Route path="/users" element={<Users />} /> 
            <Route path="/users/:id" element={<User user={selectedUser} />} />
            <Route path="/createnew" element={user ? <BlogForm /> : <Navigate replace to="/login" /> } />
          </Routes>
        </div>
     
    </>
  )
}

const Menu = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const pad = {
    padding: 5
  }

  const userOperation = () => {
    if (user) {
      return (
        <>
          <span style={pad}>{user.name} logged in</span>
          <button style={pad} onClick={() => dispatch(clearUser())}>logout</button>
        </>
      )
    } else {
      return (
        <Link style={pad} to={"/login"}>login</Link>
      )
    }
  }
  return (
    <div>
      <Link style={pad} to={"/"}>blogs</Link>   
      <Link style={pad} to={"/users"}>users</Link>
      <Link style={pad} to={"/createnew"}>create</Link>
      {userOperation()}
    </div>
  )
}


export default App
