import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import CreatePost from './CreatePost';
import SinglePost from './SinglePost';
import UpdatePost from './UpdatePost';
import Login from './Login';

import PrivateRoute from './PrivateRoute';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App} />
                <PrivateRoute path="/createPost" exact component={CreatePost} />
                <Route path="/login" exact component={Login} />
                <Route path="/posts/:slug" exact component={SinglePost} />
                <PrivateRoute path="/posts/update/:slug" exact component={UpdatePost} />
            </Switch>
        </BrowserRouter>
    )
}
export default Routes;
