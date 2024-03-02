import { useParams } from "react-router-dom"
const User = ({ user }) => {
    const id = useParams().id
    return (
        <div>
            <h2>{user.name}</h2>
            <h3>added blogs</h3> 
            {user.blogs.map(b => <li key={b.id}>{b.title}</li>)}
        </div>
    )
}

export default User