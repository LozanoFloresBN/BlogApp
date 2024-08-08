import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const URI = 'http://localhost:8080/blogs/'

const CompCreateBlog = () => {
    const [user_id, setUser_id] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const navigate = useNavigate()

    const store = async (e) => {
        e.preventDefault()
        await axios.post(URI, { user_id: user_id, title: title, content: content })
        navigate('/blogs')
    }
    return (
        <div>
            <h3>Create POST</h3>
            <form onSubmit={store}>
                <div className='mb-3'>
                    <label className='form-label'>Usuario</label>
                    <input
                        value={user_id}
                        onChange={(e) => setUser_id(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>
                <button type='submit' className='btn btn-primary'>Store</button>
                <button type='button' className='btn btn-secondary ml-2' onClick={() => navigate('/blogs')}>Cancel</button>
            </form>
        </div>
    )
}

export default CompCreateBlog