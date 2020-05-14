import React, { Component } from 'react';
import userInfoContext from '../../contexts/userInfo';
import { fetch } from 'whatwg-fetch';
import Header from '../../components/Header/index';
import Article from './Article/index';
import { dateFormat } from '../../utils/dateFormat';
import styles from './index.css';

class Post extends Component {
    static contextType = userInfoContext

    constructor(props) {
        super(props);
        this.state = { content: '', date: ''};
    }


    componentDidMount() {
        const { match: { params: { title } } } = this.props;
        this.prevTitle = document.title;
        document.title = `${document.title}-${title}`;
        fetch(`/raw/posts/${title}.md`).then(res => {
            const date = res.headers.get('last-modified');
            res.text().then(value => {
                this.setState({
                    content: value,
                    date
                })
            });
        })
    }

    componentWillUnmount() {
        document.title = this.prevTitle;
    }

    render() {
        let { content, date } = this.state;
        return  <>
                    <Header></Header>
                    <div className={styles.container}>
                        <aside className={styles['article-info-box']}>
                            {date ? <> wrote at <time className={styles.date}>{date && dateFormat(new Date(date))}</time></> : null}
                        </aside>
                        <Article content={content}></Article>
                    </div>
                </>
    }
}

export default Post;