import React from 'react';
import Pagination from './pagination.js';
import PaginationText from './pagination.text.js';
import _ from 'underscore';
import classnames from 'classnames';

function noop() {
}

// 没啥特别，纯粹提供个约束
class SheetBatchButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const cn = classnames('btn', 'btn-default', 'btn-sm', this.props.className);
        return (
            <button {...this.props} className={cn}>{this.props.children}</button>
        );
    }
}

// 没啥特别，纯粹提供个约束
class SheetActionButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const cn = classnames('btn', 'btn-default', 'btn-xs', this.props.className);
        return (
            <button {...this.props} className={cn}>{this.props.children}</button>
        );
    }
}

class SheetColumn extends React.Component {
    static displayName = 'SheetColumn';

    render() {
        return <div>SheetColumn</div>;
    }
}

class SheetAction extends React.Component {
    static displayName = 'SheetAction';

    render() {
        return <div>SheetAction</div>;
    }
}

class SheetBatchAction extends React.Component {
    static displayName = 'SheetBatchAction';

    render() {
        return <div>SheetBatchAction</div>;
    }
}

class Sheet extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: []
        };
    }

    // static propTypes = {
    //     enableSelect: PropTypes.bool,
    //     list: PropTypes.array.isRequired,
    //     columns: PropTypes.array.isRequired,
    //     select: PropTypes.func,
    //     selectAll: PropTypes.func
    // };

    static defaultProps = {
        enableSelect: false,
        list: [],
        selectAll: noop
    };

    render() {
        const list = this.props.list || [];

        const isSelectAll = list.length === 0 ? false : _.filter(list, value => {
            return value._gm_select;
        }).length === list.length;

        const children = toString.call(this.props.children) === '[object Array]' ? this.props.children : [this.props.children];

        let columns = [], others = [], pagination, paginationText;

        _.each(children, value => {
            if (value.type.displayName === SheetColumn.displayName) {
                columns.push(value);
            } else if (value.type.displayName === Pagination.displayName) {
                pagination = value;
            } else if (value.type.displayName === PaginationText.displayName) {
                paginationText = value;
            } else {
                others.push(value);
            }
        });

        console.log(pagination);

        return (
            <div className="gm-sheet">
                <div className="gm-grid-top gm-marginBottom5">

                </div>
                <table className="table table-striped table-hover table-condensed table-bordered">
                    <thead>
                    <tr>
                        {this.props.enableSelect ? (
                            <th className="gm-grid-select">
                                <input type="checkbox" checked={isSelectAll}/>
                            </th>
                        ) : undefined}
                        {_.map(columns, (value, index) => <th key={index}>{value.props.name}</th>)}
                    </tr>
                    </thead>
                    <tbody>
                    {_.map(list, (value, index) => (
                        <tr key={index}>
                            {this.props.enableSelect ? (
                                <td>
                                    <input type="checkbox" checked={value._gm_select}/>
                                </td>
                            ) : undefined}
                            {_.map(columns, (v, i) => (
                                <td key={i}>{value[v.props.field]}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div>
                    <div className="pull-right">{pagination}</div>
                    <div className="pull-right">{paginationText}</div>
                </div>
                {others}
            </div>
        );
    }
}

_.extend(Sheet, {
    SheetColumn,
    SheetAction,
    SheetBatchAction,
    SheetActionButton,
    SheetBatchButton
});

export default Sheet;