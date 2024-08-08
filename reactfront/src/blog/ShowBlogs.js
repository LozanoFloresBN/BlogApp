import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'



const URI = 'http://localhost:8080/blogs/'


const CompShowBlogs = () => {
    const [blogs, setBlog] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        getBlogs()
    }, [])

    const getBlogs = async () => {
        try {
            const res = await axios.get(URI);
            setBlog(res.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    const deleteBlog = async (id) => {
        try {
            const blogToDelete = blogs.find(blog => blog.blog_id === id);
            Swal.fire({
                title: "Are you sure?",
                html: `You won't be able to revert this!<br><strong>${blogToDelete.title}</strong>`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axios.delete(`${URI}${id}`);
                    setBlog(prevBlogs => prevBlogs.filter(blog => blog.blog_id !== id));
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    //getBlogs();
                }
            });

        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        navigate('/');
    };

    return (
        <div className="container">
            <div className='row'>
                <div className='col'>
                    <Link to="/create" className='btn btn-primary mt-2 mb-2'><i className="fa-solid fa-plus"></i></Link>
                    <button onClick={handleLogout} className='btn btn-secondary mt-2 mb-2'>Cerrar sesión</button>
                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>
                                <th>Title</th>
                                <th>Content</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((blog) => (
                                <tr key={blog.blog_id}>
                                    <td>{blog.title}</td>
                                    <td>{blog.content}</td>
                                    <td>
                                        <Link to={`/edit/${blog.blog_id}`} className="btn btn-info"><i className="fa-regular fa-pen-to-square"></i></Link>
                                        <button onClick={() => deleteBlog(blog.blog_id)} className='btn btn-danger'><i className="fa-solid fa-trash-can"></i></button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default CompShowBlogs