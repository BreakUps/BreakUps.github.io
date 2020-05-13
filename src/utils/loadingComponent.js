import React from 'react';
import Loading from '../components/Loading';
export default function loadingComponentWrapper(Component, judgeFn) {
    return function loadingComponent(props) {
        if(judgeFn.call(null, props)) {
            return <Loading></Loading>;
        }
        else {
            return <Component {...props}></Component>
        }
    }
}