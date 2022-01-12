import { useState, useEffect } from "react";
import Nav from "./Nav";
import axios from 'axios';

import { Link } from 'react-router-dom';

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

  return (
    <div className="container pb-5">
      <Nav />
      <h1>MERN CRUD</h1>
      <hr />
      {
        posts.map((post, index) => (
          <div className="row" key={post._id} style={{ borderBottom: '1px solid silver' }}>
            <div className="col pt-3 pb-2">
              <Link to={`/posts/${post.slug}`}><h2>{post.title}</h2></Link>
              <p className="lead">{post.content.substring(0, 100)}</p>
              <p>Author <span className="badge">{post.user}</span>Published on{' '}<span className="badge">{new Date(post.createdAt).toLocaleString()}</span></p>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default App;
