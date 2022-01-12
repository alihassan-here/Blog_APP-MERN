import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import CreatePost from './CreatePost';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/createPost" exact component={CreatePost} />
            </Switch>
        </BrowserRouter>
    )
}
export default Routes;
