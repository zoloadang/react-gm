import React, {PropTypes} from 'react';
import _ from 'underscore';

// background-color: @brand-primary （#6dc3ec）
// 如果需要设置loading大小:  set size = 100  (default 50)
const LIMIT = 12;

class Loading extends React.Component {
    render() {
        let {style, size} = this.props;

        style = Object.assign({}, style, {
            'width': size + 'px',
            'height': size + 'px'
        });
        return (
            <div className="gm-loading" style={style}>
                {
                    _.times(LIMIT, (i) => (
                        <div key={i} className={"circle" + (i+1) + " loading-circle"} />
                    ))
                }
            </div>
        );
    }
}

Loading.propTypes = {
    style: PropTypes.object,
    size: PropTypes.number
};

Loading.defaultProps = {
    size: 50
};

export default Loading;