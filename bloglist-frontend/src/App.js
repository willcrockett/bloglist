import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'
const App = () => {
  const dispatch = useDispatch()
  /* ------------------------------- State Hooks ------------------------------ */
	const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  /* ------------------------------ Effect Hooks ------------------------------ */
	useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {    
    console.log('get token effect')
    
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')    
    if (loggedUserJSON) {      
      const user = JSON.parse(loggedUserJSON)      
      setUser(user)      
      blogService.setToken(user.token)    
  } else {
    setUser(null)
  }
  }, [])
  
 /* ------------------------------ Blog Handlers ----------------------------- */
  const addBlog = async (blog) => {
    const savedBlog = await blogService.create(blog)
    savedBlog.user = user
    setBlogs(blogs.concat(savedBlog))
    dispatch(setNotification(`${savedBlog.title} by ${savedBlog.author} succesfully created`, 'success', 5))
  }

  const updateBlog = async (blog) => {
    try {
      const savedBlog = await blogService.update(blog.id, blog)
      console.log(`update blog: ${savedBlog}`)
      
      setBlogs(blogs.map(b => b.id !== blog.id ? b : savedBlog))
    } catch {
      dispatch(setNotification('update error', 'error', 5))
    }
  }

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter((b) => b.id !== id))
    } catch {
      dispatch(setNotification('remove error', 'error', 5))
    }
  }

  /* ------------------------------ User Handlers ----------------------------- */
	const login = async (u) => {
			
    console.log(`app handleLogin`)
    try {
      const user = await loginService.login(u)
      
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
			setUser(user)
    } catch (e) {
			if (e.response.status === 401) {
        dispatch(setNotification('wrong username and/or password', 'error', 5))
			}
    }
  }

	const handleLogout = async (e) => {
		e.preventDefault()
		try {
			console.log('blogform handlelogut')
			window.localStorage.removeItem('loggedBloglistUser')
			setUser(null)
		} catch {
			console.log('probmlem with loggint out')
		}
	}
  /* ---------------------------- Rendering Helpers --------------------------- */
  
  blogs.sort((b1, b2) => b2.likes - b1.likes)
  const renderBlogs = () => {
    return (
      <div>
        <h2>blogs</h2>
        <form onSubmit={handleLogout}>
          {user.name} logged in {' '}
          <button type="submit">logout</button>
        </form>	
        <Toggleable buttonLabel={'Create New Blog'} ref={blogFormRef}>
          <BlogForm addBlog={addBlog} />
        </Toggleable>
        <br></br>
        {blogs.map(blog =>
        <Blog key={blog.id} 
          blog={blog} 
          update={updateBlog} 
          remove={removeBlog} 
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
        <LoginForm login={login}/>
      }
      
    </div>
  )
}

export default App
