import { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
    //STATE
    const [state, setState] = useState({
        title: '',
        content: '',
        user: '',
    });

    //DESTRUCTURE VALUES FROM state
    const { title, content, user } = state;

    //ONCHANGE EVENT HANDLER
    const handleChange = name => e => {
        setState({ ...state, [name]: e.target.value });
    }

    //ONSUBMOT EVENT HANDLER
    const handleSubmit = e => {
        e.preventDefault();
        axios
            .post(`${process.env.REACT_APP_API}/post`, { title, content, user })
            .then(response => {
                //empty state
                setState({ ...state, title: '', content: '', user: '' });
                //success alert
                alert(`Post titled ${response.data.post.title} is created!`)
            })
            .catch(err => {
                alert(err.response.data.error);
            })
    }

    return (
        <div className="container p-5 ">
            <h1>CREATE POST</h1>
            <br />
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
                    <button className='btn btn-primary'>Create</button>
                </div>
            </form>
        </div>
    );
}

export default CreatePost;
