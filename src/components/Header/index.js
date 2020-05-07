import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import userInfoContext from '../../contexts/userInfo';
import styles from './index.css';

class Header extends Component {
    static contextType = userInfoContext;
    constructor(props) {
        super(props);
        
    }

    render() {
        const { name } = this.context;
        return <header className={styles.banner}>
                <Link to='/' className={styles.title}>{`${name}'s Blog`}</Link>
            </header>;
    }

}

export default Header;