import { useState, useEffect } from "react";
import Nav from "./Nav";
import axios from 'axios';

import { Link } from 'react-router-dom';

// import renderHTML from 'react-render-html';


const App = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    axios.get(`${process.env.REACT_APP_API}/posts`)
      .then(response => {
        setPosts(response.data.posts);
      })
      .catch(err => {
        alert('Error while fetching posts!');
      })
  }

  useEffect(() => {
    fetchPosts();
  }, [])

  const deleteConfirm = slug => {
    let answer = window.confirm('Are you sure you want to delete?');
    if (answer) {
      deletePost(slug);
    }
  }

  const deletePost = slug => {
    axios.delete(`${process.env.REACT_APP_API}/posts/${slug}`)
      .then(response => {
        alert(response.data.message);
        fetchPosts();
      })
      .catch(err => alert('Error in deleting post!'))
  }

  return (
    <div className="container pb-5">
      <Nav />
      <h1 className="pt-2">MERN CRUD</h1>
      <hr />
      {
        posts.map((post, index) => (
          <div className="row" key={post._id} style={{ borderBottom: '1px solid silver' }}>
            <div className="col pt-3 pb-2">
              <div className="row">
                <div className="col-md-10">
                  <Link to={`/posts/${post.slug}`}><h2>{post.title}</h2></Link>
                  {/* <div className="lead pt-3">{renderHTML(post.content.substring(0, 100))}</div> */}
                  <p>Author <span className="badge">{post.user}</span>Published on{' '}<span className="badge">{new Date(post.createdAt).toLocaleString()}</span></p>
                </div>
                <div className='col-md-2'>
                  <Link to={`/posts/update/${post.slug}`} className='btn btn-sm btn-outline-warning'>Update</Link>
                  <button onClick={() => deleteConfirm(post.slug)} className='btn btn-sm btn-outline-danger ml-1'>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default App;
