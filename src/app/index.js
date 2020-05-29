import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HomePage, PostPage} from '../pages/index';
class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Router>
                <Switch>
                    <Route path='/' exact component={HomePage}></Route>
                    <Route path='/posts/:postUrl' component={PostPage}></Route>
                </Switch>
            </Router>
    }
}

export default App;