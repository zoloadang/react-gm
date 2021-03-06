import React, {PropTypes} from 'react';
import moment from 'moment';
import Calendar from './calendar.js';
import classNames from 'classnames';
import Trigger from './trigger';

const noop = () => {
};

class DatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.datepicker = null;
        this.handleSelect = ::this.handleSelect;
    }

    handleSelect(date) {
        this.props.onChange(date);
        setTimeout(() => {
            this.datepicker.click();
        }, 0);
    }

    render() {
        const {
            date, min, max, disabledDate,
            className, children, inputClassName, placeholder, disabled
        } = this.props;

        const popup = (
            <Calendar
                selected={date}
                onSelect={this.handleSelect}
                min={min}
                max={max}
                disabledDate={disabledDate}
            />
        );

        return (
            <div
                ref={ref => this.datepicker = ref}
                className={classNames("gm-datepicker", className)}
            >
                <Trigger component={<div/>} popup={popup}>
                    {children ? children : (
                        <input
                            type="text"
                            className={inputClassName}
                            placeholder={placeholder}
                            disabled={disabled}
                            value={date ? moment(date).format('YYYY-MM-DD') : ''}
                            onChange={noop}
                        />
                    )}
                </Trigger>
            </div>
        );
    }
}

DatePicker.propTypes = {
    date: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    inputClassName: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,

    min: React.PropTypes.object,
    max: React.PropTypes.object,
    disabledDate: React.PropTypes.func
};

export default DatePicker;