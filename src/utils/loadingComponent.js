import React from 'react';
export default function loadingComponentWrapper(Component, judgeFn) {
    return function loadingComponent(props) {
        if(judgeFn.call(null, props)) {
            return 'loading...';
        }
        else {
            return <Component {...props}></Component>
        }
    }
}