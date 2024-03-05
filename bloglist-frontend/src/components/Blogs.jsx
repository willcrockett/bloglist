import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import Notification from "./Notification"
const Blogs = () => { 

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const blogs= useSelector(({ blogs }) => blogs)
    return (
      <div>
        <Notification />
        {blogs.map(blog =>
          <div key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        )}
      </div>
    )
}


export default Blogs