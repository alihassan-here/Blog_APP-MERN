import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import CreatePost from './CreatePost';
import SinglePost from './SinglePost';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/createPost" exact component={CreatePost} />
                <Route path="/posts/:slug" exact component={SinglePost} />
            </Switch>
        </BrowserRouter>
    )
}
export default Routes;
