import React, {Component} from 'react';
import PostItem from '../../../components/PostItem/index';
import styles from './index.css';

class List extends Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        const { list = [] } = this.props;
        return <div className={styles.container}>{list.map(item => <PostItem key={item.title} post={item}></PostItem>)}</div>;
    }

}

export default List;