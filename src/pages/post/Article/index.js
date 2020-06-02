import React, { Component } from 'react';
import marked from 'marked';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import  'highlight.js/styles/ocean.css';
import styles from './index.css';
import loadingComponentWrapper from '../../../utils/loadingComponent';

hljs.registerLanguage('javascript', javascript);
const options = {
    highlight: (code, lang, callback) => {
        if(!lang) {
            callback(null, code);
        }
        else {
            callback(null, hljs.highlight(lang, code).value);
        }
    }
}

marked.setOptions(options);

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: ''
        };
    }

    componentDidMount() {
        marked(this.props.content, (err, html) => {
            if(err) {
                return;
            }
            this.setState({
                article: html
            });
        });
    }

    render() {
        const { article } = this.state;
        return <div dangerouslySetInnerHTML={{__html: article}} className={styles.article}></div>
    }

}

export default loadingComponentWrapper(Article, props => !props.content);