import React from 'react';

class NavConfig extends React.Component {
    componentDidMount() {
        if(/intro/gi.test(location.hash.split('?')[1])) {
            require.ensure([], require => {
                require('../intro').goToStart(7);
                history.replaceState(null, window.location.hash,window.location.hash.replace(/intro/, ''));
            });
        }
    }
    render() {
        return (
            <div className="demo-left-nav">
                <h2>基础部分</h2>
                <ul>
                    <li><a data-intro="颜色规范..." data-step="7" href="#/standard/Color">颜色</a></li>
                    <li><a href="#/standard/Layout">常用布局</a></li>
                </ul>
            </div>
        );
    }
}

export default NavConfig;