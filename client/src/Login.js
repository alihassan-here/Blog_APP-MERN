import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import Nav from './Nav';
import { authenticate, getUser } from './helpers';

const Login = () => {

    const [state, setState] = useState({
        name: '',
        password: ''
    });
    const { name, password } = state;
    const history = useHistory();

    //USEEFFECT
    useEffect(() => {
        getUser() && history.push('/')
    })

    //ONCHANGE EVENT HANDLER
    const handleChange = name => e => {
        setState({ ...state, [name]: e.target.value });
    }

    //ONSUBMOT EVENT HANDLER
    const handleSubmit = e => {
        e.preventDefault();
        axios
            .post(`${process.env.REACT_APP_API}/login`, { name, password })
            .then(response => {
                //response will contain token and name
                authenticate(response, () => history.push('/createPost'))
                //redirect to create page
            })
            .catch(err => {
                alert(err.response.data.error);
            })
    }



    return (
        <div className="container pb-5">
            <Nav />
            <br />
            <h1>LOGIN</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className='text-muted'>UserName</label>
                    <input value={name} onChange={handleChange('name')} type="text" className="form-control" placeholder="your username" required />
                </div>
                <div className="form-group">
                    <label className='text-muted'>Password</label>
                    <input value={password} onChange={handleChange('password')} type="password" className="form-control" placeholder="your password" required />
                </div>
                <div>
                    <button className='btn btn-primary'>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login
