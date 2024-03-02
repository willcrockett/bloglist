const User = ({ user }) => {
    return (
        <div>
            <h1>user.name</h1>
            <h2>added blogs</h2> 
            {user.blogs.map(b => <li key={b.id}>b.title</li>)}
        </div>
    )
}

export default User