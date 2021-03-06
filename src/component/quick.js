import React, {PropTypes} from 'react';
import Flex from './flex';
import Collapse from './collapse';
import _ from 'underscore';
import classNames from 'classnames';

class QuickPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            in: this.props.in || true
        };
    }

    handleCollapse() {
        this.setState({
            in: !this.state.in
        });
    }

    render() {
        const {className, title, collapse, right, children, ...rest} = this.props;
        return (
            <div {...rest} className={classNames("gm-bg gm-border gm-quick gm-quick-panel", className)}>
                <Flex flex alignCenter justifyBetween className="gm-quick-title">
                    {title}
                    {collapse ? (
                        <a onClick={::this.handleCollapse}>{collapse === true ? "收拢明细" : collapse} </a>
                    ) : undefined}
                    <Flex flex/>
                    {right ? React.cloneElement(right, {className: right.props.className}) : undefined}
                </Flex>
                <Collapse in={this.state.in}>
                    <div className="gm-border-top">
                        {children}
                    </div>
                </Collapse>
            </div>
        );
    }
}

QuickPanel.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.element]),
    collapse: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    right: PropTypes.object,
    in: PropTypes.bool
};


class QuickInfoCell extends React.Component {
}
QuickInfoCell.displayName = 'QuickInfoCell';
QuickInfoCell.propTypes = {
    primary: PropTypes.bool,
    title: PropTypes.string.isRequired
};

class QuickInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const children = toString.call(this.props.children) === '[object Array]' ? this.props.children : [this.props.children];
        let infos = [], primaryInfo = false, others = [];

        _.each(children, value => {
            switch (value.type.displayName) {
                case QuickInfoCell.displayName:
                    if (value.props.primary) {
                        primaryInfo = value;
                    } else {
                        infos.push(value);
                    }
                    break;
                default:
                    others.push(value);
                    break;
            }
        });

        return (
            <div className={classNames("gm-bg gm-border gm-quick", this.props.className)}>
                {(infos.length > 0 || primaryInfo) ? (
                    <Flex className="gm-quick-title">
                        {primaryInfo ? (
                            <Flex alignCenter juestifyCenter width="150px">
                                <strong>{primaryInfo.props.title}：</strong> {primaryInfo.props.children}
                            </Flex>
                        ) : undefined}
                        {primaryInfo ? (
                            <Flex className="gm-margin-lr-15 gm-border-right"/>
                        ) : undefined}
                        <Flex flex wrap>
                            {_.map(infos, (value, i) => (
                                <Flex key={i} width="33.33%" juestifyCenter>
                                    <strong>{value.props.title}：</strong>{value.props.children}
                                </Flex>
                            ))}
                        </Flex>
                    </Flex>
                ) : undefined}
                <div className="gm-border-top">
                    {others}
                </div>
            </div>
        );
    }
}

class QuickFilter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={classNames("gm-bg gm-border gm-quick gm-quick-filter", this.props.className)}>
                {this.props.children}
            </div>
        );
    }
}

class QuickTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: props.active || 0
        };
    }

    componentWillReceiveProps(nextProps) {
        if ('active' in nextProps) {
            this.setState({active: nextProps.active});
        }
    }

    handleTab(i) {
        const {onChange} = this.props;
        if ('active' in this.props) {
            onChange(i);
        } else {
            this.setState({
                active: i
            });
        }
    }

    render() {
        const {
            tabs, children, active, // eslint-disable-line
            ...rest
        } = this.props;
        return (
            <div {...rest} className={classNames("b-nav-tabs", this.props.className)}>
                {this.props.right ? React.cloneElement(this.props.right, {className: this.props.right.props.className + ' pull-right'}) : null}
                <ul className="nav nav-tabs">
                    {_.map(tabs, (tab, i) => (
                        <li key={i} className={classNames("gm-quick-tab", {
                            active: i === this.state.active
                        })}>
                            <a href="javascript:;" onClick={this.handleTab.bind(this, i)}>{tab}</a>
                        </li>
                    ))}
                </ul>
                <div>
                    {children[this.state.active]}
                </div>
            </div>
        );
    }
}

// 如果有active，则一定有handleChange
QuickTab.propTypes = {
    tabs: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    active: PropTypes.number,
    right: PropTypes.element
};

class QuickDesc extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {left, right, leftFlex, rightFlex, children} = this.props;

        return (
            <div className={classNames("gm-bg gm-border gm-quick gm-quick-desc", this.props.className)}>
                <Flex>
                    <Flex flex={leftFlex || 2} alignCenter className="gm-quick-desc-title">
                        {left}
                    </Flex>
                    <Flex flex={rightFlex || 10} alignCenter className="gm-padding-left-5">
                        <div className="gm-border-left gm-padding-left-15" style={{height: '40px'}}/>
                        {right ? React.cloneElement(right, {
                            className: "gm-quick-desc-right-box gm-padding-tb-10 " + (right.props.className || '')
                        }) : null}
                    </Flex>
                </Flex>
                {
                    children ?
                        <Flex className="gm-border-top gm-padding-tb-15">
                            {children}
                        </Flex>
                        : null
                }
            </div>
        );
    }
}

module.exports = {
    QuickInfo,
    QuickInfoCell,
    QuickPanel,
    QuickFilter,
    QuickTab,
    QuickDesc
};
