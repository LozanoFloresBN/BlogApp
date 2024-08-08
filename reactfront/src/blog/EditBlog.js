import axios from "axios"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'
//import {Link} from 'react-router-dom'
const URI = 'http://localhost:8080/blogs/'

const CompEditBlog = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    const update = async (e) => {
        e.preventDefault()
        Swal.fire({
            title: "Are you sure?",
            html: `You won't be able to revert this!<br><strong></strong>`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.put(URI + id, {
                    title: title,
                    content: content
                })
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                navigate('/blogs')
            }
        });

    }
    useEffect(() => {
        const getBlogById = async () => {
            const res = await axios.get(`${URI}${id}`);
            setTitle(res.data.title);
            setContent(res.data.content);
        };

        getBlogById();
    }, [id]);
    return (
        <div>
            <h3>Edit POST</h3>
            <form onSubmit={update}>
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
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} type="text" className='form-control'/>
                </div>
                <button type='submit' className='btn btn-primary'>Store</button>
                <button type='button' className='btn btn-secondary ml-2' onClick={() => navigate('/blogs')}>Cancel</button>
            </form>
        </div>
    )


}

export default CompEditBlog