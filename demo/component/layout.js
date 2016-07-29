import React from 'react';
import {
    Flex,
    Item
} from '../../src/index';

var FlexWrap = React.createClass({
    render(){
        return (
            <Flex  height="200px" justifyAround>
                <Flex height="100px">
                    <Item selfEnd>aaa</Item>
                    <Item>ccc</Item>
                </Flex>

                <Item
                    selfCenter
                    style={{
                    'backgroundColor': '#F0F'
                    }}
                >
                    <div>43434</div>
                </Item>

                <Item
                    selfStart
                    style={{
                        'backgroundColor': '#FF0'
                    }}
                >
                    <div>demo</div>
                </Item>

            </Flex>
        );
    }
});

const Component = React.createClass({
    render(){
        return (
            <div>
                <h1>Flex</h1>
                <FlexWrap></FlexWrap>
            </div>
        );
    }
});

export default Component;