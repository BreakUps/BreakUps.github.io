import React, { Component } from 'react';
import showdown from 'showdown';
import styles from './index.css';

showdown.setFlavor('vanilla');
const converter = new showdown.Converter({tables: true});

class Article extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { content } = this.props;
        return <div dangerouslySetInnerHTML={{__html: converter.makeHtml(content)}} className={styles.article}></div>
    }

}

export default Article;