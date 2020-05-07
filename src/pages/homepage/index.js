import React, {Component, Fragment} from 'react';
import Header from '../../components/Header/index';
import List from './List/index';
import { fetch } from 'whatwg-fetch';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {list: []};
    }

    componentDidMount() {
        fetch('/raw/category.json').then(res => res.json()).then(value => {
            this.setState({
                list: value
            });
        })
    }

    render() {
        return  <Fragment>
            <Header></Header>
            <List list={this.state.list}></List>
        </Fragment>
    }

}

export default HomePage;