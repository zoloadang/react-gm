import React, {PropTypes} from 'react';
import classNames from 'classnames';


class Flex extends React.Component {

    render() {
        const {
            block = true,

            column, row, columnReverse, rowReverse,

            wrap, nowrap, wrapReverse,

            justifyStart, justifyEnd, justifyCenter, justifyBetween, justifyAround,

            alignStart, alignEnd, alignCenter, alignBetween, alignAround, alignStretch,

            itemsStart, itemsEnd, itemsCenter, itemsBaseline, itemsStretch,

            height, width,

            className, style,
            ...rest
        } = this.props;

        const inline = block ? false : true;

        const cn = classNames({
            'gm-flex-inline': inline,
            'gm-flex-block': block,

            'flex-direction-row': row,
            'flex-direction-column': column,
            'flex-direction-row-reverse': rowReverse,
            'flex-direction-column-reverse': columnReverse,

            'flex-wrap': wrap,
            'flex-wrap-reverse': wrapReverse,
            'flex-nowrap': nowrap,

            'flex-justify-start': justifyStart,
            'flex-justify-end': justifyEnd,
            'flex-justify-center': justifyCenter,
            'flex-justify-between': justifyBetween,
            'flex-justify-around': justifyAround,

            'flex-align-start': alignStart,
            'flex-align-end': alignEnd,
            'flex-align-center': alignCenter,
            'flex-align-between': alignBetween,
            'flex-align-around': alignAround,
            'flex-align-stretch': alignStretch,

            'flex-items-start': itemsStart,
            'flex-items-end': itemsEnd,
            'flex-items-center': itemsCenter,
            'flex-items-basline': itemsBaseline,
            'flex-items-stretch': itemsStretch
        }, className);

        let s = Object.assign({}, style);
        if (height) {
            s.height = typeof height === 'number' ? height + 'px' : height;
        }
        if (width) {
            s.width = typeof width === 'number' ? width + 'px' : width;
        }

        return <div {...rest} className={cn} style={s}>{this.props.children}</div>;
    }
}

Flex.propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    inline: PropTypes.bool,
    block: PropTypes.bool,

    column: PropTypes.bool,
    row: PropTypes.bool,
    columnReverse: PropTypes.bool,
    rowReverse: PropTypes.bool,

    wrap: PropTypes.bool,
    nowrap: PropTypes.bool,
    wrapReverse: PropTypes.bool,

    justifyStart: PropTypes.bool,
    justifyEnd: PropTypes.bool,
    justifyCenter: PropTypes.bool,
    justifyBetween: PropTypes.bool,
    justifyAround: PropTypes.bool,

    alignStart: PropTypes.bool,
    alignEnd: PropTypes.bool,
    alignCenter: PropTypes.bool,
    alignBetween: PropTypes.bool,
    alignAround: PropTypes.bool,
    alignStretch: PropTypes.bool,

    itemsStart: PropTypes.bool,
    itemsEnd: PropTypes.bool,
    itemsCenter: PropTypes.bool,
    itemsBaseline: PropTypes.bool,
    itemsStretch: PropTypes.bool
};

export default Flex;
