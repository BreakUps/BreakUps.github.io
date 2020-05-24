import React, { Component } from 'react';
import marked from 'marked';
import styles from './index.css';
import loadingComponentWrapper from '../../../utils/loadingComponent';

class Article extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { content } = this.props;
        return <div dangerouslySetInnerHTML={{__html: marked(content)}} className={styles.article}></div>
    }

}

export default loadingComponentWrapper(Article, props => !props.content);