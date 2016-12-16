import Introjs from 'react-intro.js/intro';
import 'react-intro.js/introjs.css';
import React from 'react';
import classNames from 'classnames';
import _ from 'underscore';

const introJs = Introjs.introJs();

window.introJs = introJs;

// 这部分是体验引导功能代码 begin
introJs.setOptions({
    exitOnOverlayClick: false,
    nextLabel: '下一步',
    prevLabel: '上一步',
    skipLabel: '跳过',
    doneLabel: '完成',
    showBullets: false
});

const steps = [
    {
        intro: '开始功能引导'
    },
    {
        intro: '这里看UI规范',
        element: '#intro1'
    },
    {
        intro: '这里看组件',
        element: '#intro2'
    },
    {
        intro: '点导航进入Collapse看具体用法',
        element: '#intro3'
    },
    {
        intro: '点按钮展开Collapse',
        element: '#intro4'
    },
    {
        intro: '展开后的Collapse',
        element: '#intro5'
    }
];

introJs.onbeforechange((targetElement) => {
    const step = introJs._currentStep;
    if (step) {
        if (step === 2) {
            targetElement.click();
        } else if(step === 3) {
            console.log(document.querySelector('#intro3').click());
        } else if (step === 5) {
            // 异步场景，返回一个promise
            document.querySelector('#intro4').click();
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve();
                }, 500);
            });
        }
    }

});

introJs.onchange(() => {
    // 在_showElement的时候修正element
    const step = introJs._currentStep;
    const stepItem = introJs._introItems[introJs._currentStep];
    if (steps[step].element) {
        stepItem.element = document.querySelector(steps[step].element);

        // 非某刻页面元素
        if (stepItem.position === 'floating') {
            stepItem.position = 'bottom';
        }
    }
});
// 这部分是体验引导功能代码 end


// 会有多个监听者，所以是数组
let listenerIntroChange = [];

introJs.onafterchange(() => {
    // 变的时候通知。 一开始的时候也会onafterchange
    _.each(listenerIntroChange, linstener => linstener());
});
introJs.onexit(() => {
    // 结束的时候通知
    _.each(listenerIntroChange, linstener => linstener());
});
introJs.oncomplete(() => {
    if(introJs._options.steps) {
        location.href = '#/standard/Color?intro';
    }
});

class IntroWrap extends React.Component {
    constructor(props) {
        super(props);
        // 任意，用来更新而已
        this.state = {
            i: 0
        };
        this.linstener = null;
    }

    componentDidMount() {
        // 监听
        this.linstener = () => {
            this.setState({
                i: this.state.i + 1
            });
        };
        listenerIntroChange.push(this.linstener);
    }

    componentWillUnmount() {
        // 卸载
        const i = listenerIntroChange.indexOf(this.linstener);
        if (i > -1) {
            listenerIntroChange.splice(i, 1);
        }
    }

    render() {
        // 默认children有
        const {children} = this.props;

        const {id, className} = children.props;

        // 如果忘了写id, 则啥也不做，因为没法匹配当前步骤
        if (!id) {
            console.warn('can not find id');
            return children;
        }

        // 如果没有开始引导，观察没有_currentStep字段
        // 如果结束之后，_currentStep是undefined
        if (introJs._currentStep === undefined) {
            return children;
        }

        const element = introJs._introItems[introJs._currentStep].element;
        // 有些步骤没有element
        if (!element) {
            return children;
        }

        // 如果非当前步骤，啥也不做
        if (id !== element.id) {
            return children;
        }

        return React.cloneElement(children, {
            ...children.props,
            className: classNames(className, 'introjs-showElement introjs-relativePosition')
        });
    }
}

module.exports = {
    start: () => {
        introJs.setOption('steps', steps);
        introJs.setOption('doneLabel', '进入UI规范');
        introJs.start();
    },
    goToStart: (step) => {
        introJs.setOption('steps', null);
        introJs.setOption('doneLabel', '完成指引');
        introJs.goToStep(step).start();
    },
    IntroWrap
};