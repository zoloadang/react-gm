import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

const noop = () => {
};

const tipContainerId = '_gm_tips_container' + (Math.random() + '').slice(2);
let tipsContainer = document.getElementById(tipContainerId);
if (!tipsContainer) {
    tipsContainer = document.createElement('div');
    tipsContainer.className = 'gm-tips';
    tipsContainer.id = tipContainerId;
    document.body.appendChild(tipsContainer);
}

const TipStatics = {
    tip: function (options) {
        const _b_onClose = options.onClose;
        let div = document.createElement('div');
        div.className = 'gm-tips-cell';
        tipsContainer.appendChild(div);

        options.onClose = function () {
            tipsContainer.removeChild(div);
            if (_b_onClose) {
                _b_onClose();
            }
        };
        ReactDOM.render(<TipOverlay {...options} />, div);
    },
    success: function (options) {
        if (typeof options === 'string') {
            options = {
                children: options
            };
        }
        options.type = 'success';
        TipStatics.tip(options);
    },
    info: function (options) {
        if (typeof options === 'string') {
            options = {
                children: options
            };
        }
        options.type = 'info';
        TipStatics.tip(options);
    },
    warning: function (options) {
        if (typeof options === 'string') {
            options = {
                children: options
            };
        }
        options.type = 'warning';
        TipStatics.tip(options);
    },
    danger: function (options) {
        if (typeof options === 'string') {
            options = {
                children: options
            };
        }
        options.type = 'danger';
        TipStatics.tip(options);
    }
};

class TipOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.timer = null;
        this.hasClosed = false;
        this.handleClose = ::this.handleClose;
    }

    render() {
        const {title, type, children} = this.props;
        return (
            <div ref="tipOverlay" className="animated fadeInRight">
                <Tip title={title}
                     type={type}
                     onClose={this.handleClose}>
                    {children}
                </Tip>
            </div>
        );
    }

    componentDidMount() {
        const {time} = this.props;
        if (time) {
            this.timer = setTimeout(()=> this.fadeOut(), time);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    handleClose() {
        this.fadeOut();
    }

    fadeOut() {
        if (!this.hasClosed) {
            this.hasClosed = true;
            this.props.onClose();
        }
    }
}
TipOverlay.PropTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    onClose: PropTypes.func,
    time: PropTypes.number
};

TipOverlay.defaultProps = {
    time: 3000
};

class Tip extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = ::this.handleClose;
    }

    render() {
        const {title, type, children} = this.props;
        const iconClassName = {
            success: 'glyphicon glyphicon-ok-sign',
            info: 'glyphicon glyphicon-info-sign',
            warning: 'glyphicon glyphicon-exclamation-sign',
            danger: 'glyphicon glyphicon-remove-sign'
        };

        return (
            <div className="gm-tip panel panel-default">
                <button type="button" className="close" onClick={this.handleClose}>
                    <span>&times;</span>
                </button>
                <i className={"text-" + type + ' ' + iconClassName[type]}/>
                <div className="panel-body">
                    {title ? <div><strong>{title}</strong></div> : undefined}
                    {children}
                </div>
            </div>
        );
    }

    handleClose() {
        this.props.onClose();
    }
}

Tip.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    onClose: PropTypes.func
};

Tip.defaultProps = {
    title: '',
    type: 'info',
    onClose: noop
};

Object.assign(Tip, TipStatics);

export default Tip;