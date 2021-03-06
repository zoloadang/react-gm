import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import classNames from 'classnames';
import {createChainedFunction, contains} from 'gm-util';

class Trigger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
        this.handleClick = ::this.handleClick;
        this.handleMouseEnter = ::this.handleMouseEnter;
        this.handleMouseLeave = ::this.handleMouseLeave;
        this.handleBodyClick = ::this.handleBodyClick;

        this.timer = null;
        this.refPopup = null;
    }

    componentDidMount() {
        document.body.addEventListener('click', this.handleBodyClick);
    }

    componentWillUnmount() {
        document.body.removeEventListener('click', this.handleBodyClick);
    }

    handleBodyClick(event) {
        const target = event.target;
        const root = findDOMNode(this);
        if (!contains(root, target)) {
            this.setState({
                active: false
            });
        }
    }

    handleClick(event) {
        const {disabled, children, type} = this.props;
        // 优先获取props的disabled
        if (disabled === true) {
            return;
        }

        let active = true;
        if (type === 'click') {
            // 如果是点击的，点击 popup 内部不改变active
            if (contains(findDOMNode(this.refPopup), event.target)) {
                return;
            }

            active = !this.state.active;
        }

        if (disabled === false) {
            this.setState({
                active
            });
        }
        // 如果没有props disabled，判定children是否不可用状态
        if (!children.props.disabled) {
            this.setState({
                active
            });
        }
    }

    handleMouseEnter() {
        const {disabled, children} = this.props;
        // 优先获取props的disabled
        if (disabled === true) {
            return;
        }

        clearTimeout(this.timer);

        if (disabled === false) {
            this.setState({
                active: true
            });
        }

        // 如果没有props disabled，判定children是否不可用状态
        if (!children.props.disabled) {
            this.setState({
                active: true
            });
        }
    }

    handleMouseLeave() {
        const {disabled, children} = this.props;
        // 优先获取props的disabled
        if (disabled === true) {
            return;
        }

        clearTimeout(this.timer);

        if (disabled === false) {
            this.timer = setTimeout(() => {
                this.setState({
                    active: false
                });
            }, 500);
        }

        // 如果没有props disabled，判定children是否不可用状态
        if (!children.props.disabled) {
            this.timer = setTimeout(() => {
                this.setState({
                    active: false
                });
            }, 500);
        }
    }

    render() {
        const {component, children, popup, type, right, top} = this.props;
        const child = React.Children.only(children);
        const {active} = this.state;

        const p = {};
        if (type === 'focus' || type === 'click') {
            p.onClick = createChainedFunction(component.props.onClick, this.handleClick);
        } else if (type === 'hover') {
            p.onMouseEnter = createChainedFunction(component.props.onMouseEnter, this.handleMouseEnter);
            p.onMouseLeave = createChainedFunction(component.props.onMouseLeave, this.handleMouseLeave);
        }

        const componentProps = Object.assign({}, component.props, p);

        return React.cloneElement(component, Object.assign({}, componentProps, {
            className: classNames(component.props.className, 'gm-trigger'),
            children: [child, active ? React.createElement('div', {
                key: 'popup',
                ref: ref => this.refPopup = ref,
                className: classNames('gm-trigger-popup ', {
                    'gm-trigger-popup-right': right,
                    'gm-trigger-popup-top': top
                })
            }, popup) : undefined]
        }));
    }
}

Trigger.propTypes = {
    type: PropTypes.oneOf(['focus', 'click', 'hover']),
    component: PropTypes.element.isRequired,
    popup: PropTypes.element, // 有可能是无
    children: PropTypes.element,
    right: PropTypes.bool,
    top: PropTypes.bool,
    disabled: PropTypes.bool
};

Trigger.defaultProps = {
    type: 'focus'
};

export default Trigger;