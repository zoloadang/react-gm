---
imports:
    import {DatePicker, Flex} from '../../src/index';
    import moment from 'moment';
---
## DatePicker

只能选择，不能编辑

::: demo demo
```js
class DatePickerWrap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null
        };
        this.handleChange = ::this.handleChange;
    }

    render() {
        return (
            <div>
                <Flex>
                    <div>
                        <div>inline-block</div>
                        <DatePicker
                            date={this.state.date}
                            placeholder="adfasdf"
                            onChange={this.handleChange}
                            inputClassName="form-control input-sm"
                        />
                    </div>
                    <div>
                        <div>disabled</div>
                        <DatePicker
                            date={this.state.date}
                            placeholder="adfasdf"
                            disabled={true}
                            onChange={this.handleChange}
                            inputClassName="form-control input-sm"
                        />
                    </div>
                    <div>
                        <div>disabled date</div>
                        <DatePicker
                            date={this.state.date}
                            placeholder="选今天之后的"
                            onChange={this.handleChange}
                            inputClassName="form-control input-sm"
                            min={new Date()}
                        />
                    </div>
                    <div>
                        <div>disabled date</div>
                        <DatePicker
                            date={this.state.date}
                            placeholder="非周五"
                            onChange={this.handleChange}
                            inputClassName="form-control input-sm"
                            disabledDate={m => {
                                return moment(m).get('day') === 5;
                            }}
                        />
                    </div>
                </Flex>

                <div className="gm-padding10"></div>
                <DatePicker
                    date={this.state.date}
                    onChange={this.handleChange}
                >
                    <span>
                        {this.state.date ? moment(this.state.date).format('YYYY-MM-DD') : '请点击选择'}
                    </span>
                </DatePicker>
            </div>
        );
    }

    handleChange(date) {
        console.log(date);
        this.setState({
            date: date
        });
    }
}
```
```jsx
<DatePickerWrap/>
```
:::


### Props
- `date (object)` Date对象
- `onChange (func|isRequired)` 选择后回调，参数是Date对象
- `inputClassName (string)` 自定义input的样子
- `placeholder (string)`
- `disabled (bool)` 是否不可用
- `className (string)`
- `disabledDate (func)` 提供date参数，返回true or false
- `min (object)` 一个Date对象，最小日期
- `max (object)` 一个Date对象，最大日期
