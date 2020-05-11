import React, { Component } from 'react';
import showdown from 'showdown';
import styles from './index.css';
import loadingComponentWrapper from '../../../utils/loadingComponent';

showdown.setFlavor('github');
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

export default loadingComponentWrapper(Article, props => !props.content);