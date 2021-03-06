import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Modal from './modal';

const noop = () => {
};

// 搞的复杂了，后续要补充文档

let dialogContainerId = '_gm_dialog_container' + (Math.random() + '').slice(2);
let dialogContainer = document.getElementById(dialogContainerId);
if (!dialogContainer) {
    dialogContainer = document.createElement('div');
    dialogContainer.className = 'gm-container-dialog';
    dialogContainer.id = dialogContainerId;
    document.body.appendChild(dialogContainer);
}
let DialogStatics = {};
DialogStatics = {
    alert(options){
        options.type = 'alert';
        options.size = 'sm';
        return DialogStatics.dialog(options);
    },
    confirm(options){
        options.type = 'confirm';
        options.size = 'sm';
        return DialogStatics.dialog(options);
    },
    prompt(options){
        options.type = 'prompt';
        options.size = 'sm';
        return DialogStatics.dialog(options);
    },
    dialog(options){
        options = Object.assign({}, {size: 'sm'}, options);
        return new Promise((resolve, reject) => {
            let div = document.createElement('div');
            dialogContainer.appendChild(div);
            const _OK = options.onOK;
            options.onOK = value => {
                const result = _OK && _OK(value);
                if (result !== false) {
                    resolve(value);
                } else if (result.then) { // 简单判断是否promise
                    return result;
                }
                return result;
            };
            options.onCancel = () => reject();
            ReactDOM.render(<Dialog show={true} {...options} />, div);
        });
    }
};

class Dialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: props.show,
            isLoading: false
        };
        this.handleCancel = ::this.handleCancel;
        this.handleOk = ::this.handleOk;
        this.handleEnter = ::this.handleEnter;
        this.______isMounted = false;
    }

    componentWillReceiveProps(nextProps) {
        if ('show' in nextProps) {
            this.setState({
                show: nextProps.show
            });
        }
    }

    componentWillUnMount() {
        this.______isMounted = true;
    }

    handleCancel() {
        this.props.onCancel();
        this.setState({
            show: false
        });
    }

    handleOk() {
        const result = this.props.onOK(this.props.type === 'prompt' ? this.refs.input.value : undefined);
        if (result === false) {
            return;
        }

        this.setState({
            isLoading: true
        });

        Promise.resolve(result).then(() => {
            if (!this.______isMounted) {
                this.setState({
                    show: false,
                    isLoading: false
                });
            }
        }).catch(() => {
            this.setState({
                isLoading: false
            });
        });
    }

    handleEnter(event) {
        if (event.keyCode === 13) {
            this.handleOk();
        }
    }

    render() {
        const {isLoading} = this.state;
        const {size, title, children, type, promptDefaultValue, promptPlaceholder, cancelBtn, OKBtn} = this.props;
        let modalProps = {
            show: this.state.show,
            onHide: this.handleCancel
        };
        if (size !== 'md') {
            modalProps.size = size;
        }
        return (
            <Modal {...modalProps} size={modalProps.size} title={title}>
                <div>
                    {children}
                    {type === 'prompt' && (
                        <input
                            autoFocus
                            defaultValue={promptDefaultValue}
                            placeholder={promptPlaceholder}
                            ref="input"
                            type="text"
                            style={{display: 'block', width: '100%'}}
                            onKeyDown={this.handleEnter}
                        />
                    )}
                </div>
                <div className="gm-gap10"></div>
                <div className="text-right">
                    {(type !== 'alert' && cancelBtn && !isLoading) && (
                        <button className="btn btn-default" onClick={this.handleCancel}>{cancelBtn}</button>
                    )}
                    <div className="gm-gap10"></div>
                    {OKBtn && (
                        <button
                            className="btn btn-primary"
                            disabled={isLoading}
                            onClick={!isLoading ? this.handleOk : null}>
                            {isLoading ? <i className="glyphicon glyphicon-refresh glyphicon-spin"/> : OKBtn}
                        </button>
                    )}
                </div>
            </Modal>
        );
    }
}
Object.assign(Dialog, DialogStatics);

Dialog.propTypes = {
    show: PropTypes.bool.isRequired,
    title: PropTypes.string,
    onCancel: PropTypes.func,
    onOK: PropTypes.func,
    size: PropTypes.string,
    promptDefaultValue: PropTypes.string,
    promptPlaceholder: PropTypes.string,
    cancelBtn: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    OKBtn: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ])
};
Dialog.defaultProps = {
    show: false,
    title: '提示',
    type: 'confirm',
    onCancel: noop,
    onOK: noop,
    size: 'md',
    cancelBtn: '取消',
    OKBtn: '确定'
};

export default Dialog;