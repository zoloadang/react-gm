import React, {PropTypes} from 'react';
// import Pagination from './pagination.js';
// import PaginationText from './pagination.text.js';
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
    render() {

    }
}

class Sheet extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        enableSelect: PropTypes.bool,
        list: PropTypes.array.isRequired,
        columns: PropTypes.array.isRequired,
        select: PropTypes.func,
        selectAll: PropTypes.func
    };

    getDefaultProps() {
        return {
            enableSelect: false,
            list: [],
            selectAll: noop
        };
    }

    render() {
        const list = this.props.list || [];

        const isSelectAll = _.filter(list, value => {
                return value._gm_select;
            }).length === list.length;

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
                        {_.map(this.props.columns, (value, index) => <th
                            key={index} {...value.props}>{value.name}</th>)}
                    </tr>
                    </thead>
                </table>
            </div>
        );
    }
}

_.extend(Sheet, {
    SheetColumn,
    SheetActionButton,
    SheetBatchButton
});

export default Sheet;