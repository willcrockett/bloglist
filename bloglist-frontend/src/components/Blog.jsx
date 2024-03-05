import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(({user}) => user)
  
  const showRemoveButton = { display: user && user.username === blog.user.username ? '' : 'none' }
  const handleLike = () => {
    dispatch(likeBlog(blog.id))
  }
  
  const handleRemove = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
    }
  }
  return (
    <div>
      <div>
        <h2>{blog.title}</h2>
        <a href={blog.url}>{blog.url}</a> 
        <p>{blog.likes} likes <button onClick={handleLike}>Like</button></p>
        <p>{blog.user.name}</p>
        <h2>comments</h2>
        <ul>
          {blog.comments.map(c => <li key={c}>{c}</li>)}
        </ul>
        <button style={showRemoveButton} onClick={handleRemove}>Remove</button>
      </div>  
    </div>  
  )
}

export default Blog