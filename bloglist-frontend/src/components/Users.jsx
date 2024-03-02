import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'
const Users = () => {
    const users = useSelector(({ users }) => users)
    return (
        <div>
            <h2>Users</h2>
            <table>
                <tbody>

                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                    {users.map(u => 
                        <tr key={u.id}>
                            <td>
                                <Link to={`/users/${u.id}`}>{u.name}</Link>
                            </td>
                            <td>{u.blogs.length}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Users