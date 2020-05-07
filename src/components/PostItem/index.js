import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { dateFormat } from '../../utils/dateFormat'; 
import styles from './index.css';

class PostItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { title, date } = this.props.post;
        date = new Date(date);
        return <div className={styles.container}>
                <Link to={`/posts/${title}`}>{title}</Link>
                <time className={styles.date}>{dateFormat(date)}</time>
            </div>
    }
}

export default PostItem;