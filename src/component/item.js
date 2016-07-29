import React, {PropTypes} from 'react';
import classNames from 'classnames';


class Item extends React.Component {
    // itemGrow,itemShrink,itemBasis,item, flex, order
    render() {
        const {
            block = true,

            selfAuto, selfStart, selfEnd, selfCenter, selfBaseline, selfStretch,

            width, height,

            className, style,
            ...rest
        } = this.props;

        const inline = block ? false : true;

        const cn = classNames({
            'gm-item-inline': inline,
            'gm-item-block': block,

            'item-self-auto': selfAuto,
            'item-self-start': selfStart,
            'item-self-end': selfEnd,
            'item-self-center': selfCenter,
            'item-self-baseline': selfBaseline,
            'item-self-stretch': selfStretch
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

Item.propTypes = {
    order: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    itemGrow: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    itemShrink: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    itemBasis: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    item: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    heght: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    selfAuto: PropTypes.bool,
    selfStart: PropTypes.bool,
    selfEnd: PropTypes.bool,
    selfCenter: PropTypes.bool,
    selfBaseline: PropTypes.bool,
    selfStretch: PropTypes.bool
};

export default Item;
