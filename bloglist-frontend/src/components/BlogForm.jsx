/* eslint-disable import/no-anonymous-default-export */
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Toggleable from './Toggleable'
const BlogForm = ({blogFormRef}) => {
	const dispatch = useDispatch()
	const initialFields = {
		title: '',
		author: '',
		url: ''
	}
	const [fields, setFields] = useState(initialFields)

	const addBlog = async (blog) => {
		dispatch(createBlog(blog))
		dispatch(setNotification(`${blog.title} by ${blog.author} succesfully created`, 'success', 4))
	}
	const handleChange = (e) => {
		const { name, value } = e.target
		
		setFields((prevState) => ({
				...prevState,
				[name]: value
			})
		)
	}

	const handleCreate = (e) => {
		e.preventDefault()
		addBlog(fields)
		setFields({...initialFields})
	}

	return ( 	
		<div>
			<Toggleable buttonLabel={'Create New Blog'} ref={blogFormRef}>
				<h2>create new</h2>
				<form onSubmit={handleCreate}>
					<li>
						title:{' '}
						<input 
							type="text"
							name="title"
							value={fields.title}
							onChange={handleChange}
						/>
					</li>
					<li>
						author:{' '}
						<input 
							type="text"
							name="author"
							value={fields.author}
							onChange={handleChange}
						/>
					</li>
					<li>
						url:{' '}
						<input 
							type="text"
							name="url"
							value={fields.url}
							onChange={handleChange}
						/>
					</li>
					<button type="submit">create</button>
				</form>
			</Toggleable>
		</div>
	)
}

export default BlogForm