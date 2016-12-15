import Introjs from 'react-intro.js/intro';
import 'react-intro.js/introjs.css';
import React from 'react';
const introJs = Introjs.introJs();

let setIntroClassNameFunc = null;

window.introJs = introJs;

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

introJs.setOption('steps', steps);

introJs.onbeforechange((targetElement) => {
    const step = introJs._currentStep;
    if (step) {
        if (step === 3) {
            targetElement.click();
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


introJs.onafterchange(() => {
    IntroWrap.setIntroClassName(" introjs-showElement introjs-relativePosition");
});
introJs.onexit(() => {
    IntroWrap.setIntroClassName('');
});

class IntroWrap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            introClassName: ''
        };
    }
    componentDidMount() {
        setIntroClassNameFunc = (introClassName) => {
            this.setState({
                introClassName
            });
        };
    }

    componentWillUnmount() {
        setIntroClassNameFunc = null;
    }
    render() {
        const children = this.props.children;

        const childrenId = children.props.id,
            currentStep = introJs._introItems[introJs._currentStep] || {},
            currentStepId = currentStep.element && currentStep.element.id;

        let introClass = children.props.className;

        if(childrenId === currentStepId) {
            console.log('true...');
            introClass += this.state.introClassName;
        }

        return React.cloneElement(this.props.children, Object.assign({},
            {...children.props},
            {className: introClass}));
    }
}
IntroWrap.setIntroClassName = (introClassName) => {
    if (setIntroClassNameFunc) {
        setIntroClassNameFunc(introClassName);
    } else {
        console.warn('IntroWrap is uninitialized');
    }
};

module.exports = {
    start: () => {
        introJs.start();
    },
    IntroWrap
};