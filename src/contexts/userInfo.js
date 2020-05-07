import react, { createContext} from 'react';
const userInfo = {
    name: 'Button Chan'
}
const context = createContext(userInfo);

export default context;