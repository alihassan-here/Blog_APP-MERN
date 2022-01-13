import { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from "./Nav";

import { useHistory } from 'react-router-dom';

const UpdatePost = (props) => {
    const history = useHistory();
    const [state, setState] = useState({
        title: '',
        content: '',
        slug: '',
        user: '',
    });
    const { title, content, slug, user } = state;

    useEffect(() => {
        axios.
            get(`${process.env.REACT_APP_API}/posts/${props.match.params.slug}`)
            .then((response) => {
                const { title, content, slug, user } = response.data;
                setState({ ...state, title, content, slug, user });
            })
            .catch(err => alert("Error in updating post"));
    }, []);

    //ONCHANGE EVENT HANDLER
    const handleChange = name => e => {
        setState({ ...state, [name]: e.target.value });
    }

    //ONSUBMOT EVENT HANDLER
    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`${process.env.REACT_APP_API}/posts/${slug}`, { title, content, user })
            .then(response => {
                const { title, content, slug, user } = response.data;
                //empty state
                setState({ ...state, title, content, slug, user });
                //success alert
                alert(`Post titled ${title} is Updated!`)
                history.push('/')
            })
            .catch(err => {
                alert(err.response.data.error);
            })
    }


    const showUpdateForm = () => (

        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className='text-muted'>Title</label>
                <input value={title} onChange={handleChange('title')} type="text" className="form-control" placeholder="Post title" required />
            </div>
            <div className="form-group">
                <label className='text-muted'>Content</label>
                <textarea value={content} onChange={handleChange('content')} type="text" rows="8" cols="100" className="form-control" placeholder="Write something.." required />
            </div>
            <div className="form-group">
                <label className='text-muted'>User</label>
                <input value={user} onChange={handleChange('user')} type="text" className="form-control" placeholder="your name" required />
            </div>
            <div>
                <button className='btn btn-primary'>Update</button>
            </div>
        </form>
    )

    return (
        <div className="container pb-5">
            <Nav />
            <br />
            <h1>Update Post</h1>
            {
                showUpdateForm()
            }
        </div>
    )
}

export default UpdatePost;
