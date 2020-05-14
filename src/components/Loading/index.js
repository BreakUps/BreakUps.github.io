import React, {Component} from 'react';
import styles from './index.css';

class Loading extends Component {
    
    constructor(props) {
        super(props);
    }
    

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return <div className={styles['loading-box']}>
            <span>...</span>
            <span className={styles.ellipse}>...</span>
            </div>
    }

}

export default Loading;