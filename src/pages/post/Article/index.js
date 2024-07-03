import React, { Component } from 'react';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import  'highlight.js/styles/github.css';
import styles from './index.css';
import loadingComponentWrapper from '../../../utils/loadingComponent';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
const marked = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      }
    })
  );

class Article extends Component {
    constructor(props) {
        super(props);
    }

    toTop(e) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        e.preventDefault();
    }


    render() {
        return  <>
                    <div dangerouslySetInnerHTML={{__html: marked.parse(this.props.content)}} className={styles.article}></div>
                    <div className={styles['top-button-box']}>
                        <a href="#top" className={styles['top-button']} onClick={this.toTop} title="回顶部">&gt;</a>
                    </div>
                </>;
    }

}

export default loadingComponentWrapper(Article, props => !props.content);