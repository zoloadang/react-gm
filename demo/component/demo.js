import React from 'react';
import {DropDown} from '../../src/index';

class Demo extends React.Component {
    handleClick() {
        console.log('click');
    }

    render() {
        return (
            <div>
                <DropDown
                    popup={(
                        <DropDown.Items>
                            <DropDown.Item onClick={this.handleClick}>aaa</DropDown.Item>
                            <DropDown.Item>aaa</DropDown.Item>
                            <DropDown.Item>aaa</DropDown.Item>
                            <DropDown.Item/>
                            <DropDown.Item>aaa</DropDown.Item>
                        </DropDown.Items>
                    )}
                >
                    <button className="btn btn-default">
                        drop down <span className="caret"/>
                    </button>
                </DropDown>

                <DropDown
                    popup={(
                        <DropDown.Items>
                            <DropDown.Item onClick={this.handleClick}>aaa</DropDown.Item>
                            <DropDown.Item>aaa</DropDown.Item>
                            <DropDown.Item>aaa</DropDown.Item>
                            <DropDown.Item/>
                            <DropDown.Item>aaa</DropDown.Item>
                        </DropDown.Items>
                    )}
                >
                    <button className="btn btn-primary">
                        drop down <span className="caret"/>
                    </button>
                </DropDown>

                <DropDown
                    popup={(
                        <DropDown.Items>
                            <DropDown.Item onClick={this.handleClick}>aaa</DropDown.Item>
                            <DropDown.Item>aaa</DropDown.Item>
                            <DropDown.Item>aaa</DropDown.Item>
                            <DropDown.Item/>
                            <DropDown.Item>aaa</DropDown.Item>
                        </DropDown.Items>
                    )}
                >
                    <button className="btn btn-default btn-sm">
                        drop down <span className="caret"/>
                    </button>
                </DropDown>

                <div>
                    <DropDown
                        split
                        cartClassName="btn-sm"
                        popup={(
                            <DropDown.Items>
                                <DropDown.Item onClick={this.handleClick}>aaa</DropDown.Item>
                                <DropDown.Item>aaa</DropDown.Item>
                                <DropDown.Item>aaa</DropDown.Item>
                                <DropDown.Item/>
                                <DropDown.Item>aaa</DropDown.Item>
                            </DropDown.Items>
                        )}
                    >
                        <button className="btn btn-default btn-sm">
                            drop down
                        </button>
                    </DropDown>
                </div>
            </div>
        );
    }
}

export default Demo;