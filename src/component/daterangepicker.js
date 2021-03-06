import React, {PropTypes} from 'react';
import moment from 'moment';
import Calendar from './calendar.js';
import classNames from 'classnames';
import Trigger from './trigger';

const noop = () => {
};

class DateRangePicker extends React.Component {
    constructor(props) {
        super(props);
        this.refDateRangePicker = null;
        this.refEndTarget = null;
        this.handleSelectBegin = ::this.handleSelectBegin;
        this.handleSelectEnd = ::this.handleSelectEnd;
    }

    handleSelectBegin(date) {
        this.props.onChange(date, this.props.end);
        setTimeout(() => {
            this.refEndTarget.click();
        }, 0);
    }

    handleSelectEnd(date) {
        this.props.onChange(this.props.begin, date);
        setTimeout(() => {
            this.refDateRangePicker.click();
        }, 0);
    }

    render() {
        const {begin, end, beginProps, endProps, inputClassName, disabled} = this.props;

        return (
            <div
                ref={ref => this.refDateRangePicker = ref}
                className={classNames("gm-datepicker gm-daterangepicker", this.props.className)}
            >
                <Trigger
                    component={<div className="gm-inline-block"/>}
                    popup={(
                        <Calendar
                            selected={begin}
                            onSelect={this.handleSelectBegin}
                            {...beginProps}
                        />
                    )}
                >
                    <input
                        type="text"
                        className={inputClassName}
                        disabled={disabled}
                        value={begin ? moment(begin).format('YYYY-MM-DD') : ''}
                        onChange={noop}
                    />
                </Trigger>
                <span> ~ </span>
                <Trigger
                    component={<div className="gm-inline-block"/>}
                    popup={(
                        <Calendar
                            selected={end}
                            onSelect={this.handleSelectEnd}
                            {...Object.assign({
                                min: begin
                            }, endProps)}
                        />
                    )}
                >
                    <input
                        ref={ref => this.refEndTarget = ref}
                        type="text"
                        className={inputClassName}
                        disabled={disabled}
                        value={end ? moment(end).format('YYYY-MM-DD') : ''}
                        onChange={noop}
                    />
                </Trigger>
            </div>
        );
    }
}

DateRangePicker.propTypes = {
    begin: PropTypes.object,
    end: PropTypes.object,
    onChange: PropTypes.func,
    inputClassName: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,

    beginProps: PropTypes.shape({
        min: React.PropTypes.object,
        max: React.PropTypes.object,
        disabledDate: React.PropTypes.func
    }),
    endProps: PropTypes.shape({
        min: React.PropTypes.object,
        max: React.PropTypes.object,
        disabledDate: React.PropTypes.func
    })
};

DateRangePicker.defaultProps = {
    onChange: noop
};

export default DateRangePicker;