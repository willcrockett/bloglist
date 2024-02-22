import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
const Blog = ({ blog, remove, curr_username }) => {
  const [visible, setVisible] = useState(false) 
  const dispatch = useDispatch()
	const showWhenVisible = { display: visible ? '' : 'none'}
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const showRemoveButton = { display: curr_username === blog.user.username ? '' : 'none' }
  const handleLike = () => {
    dispatch(likeBlog(blog.id))
  }
  
  const handleRemove = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
    }
  }
  return (
    <div style={blogStyle}>
      <p>
        {blog.title} - {blog.author + ' '}
        <button onClick={() => setVisible(!visible)}>{ visible ? 'hide' : 'view' }</button>
      </p>
      <div style={showWhenVisible}>
        <p>{blog.url}</p> 
        <p>{blog.likes} likes <button onClick={handleLike}>Like</button></p>
        <p>{blog.user.name}</p>
        <button style={showRemoveButton} onClick={handleRemove}>Remove</button>
      </div>  
    </div>  
  )
}

export default Blog