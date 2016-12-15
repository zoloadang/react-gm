import Introjs from 'react-intro.js/intro';
import 'react-intro.js/introjs.css';
import React from 'react';
const introJs = Introjs.introJs();

// intro step 初始类
let introStepClassName = '';

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
introJs.onafterchange((targetElement) => {
    if(introJs._currentStep === 1) {
        introStepClassName =  targetElement.className;
    } else {
        introStepClassName = '';
    }
});

class IntroWrap extends React.Component {
    render() {
        const {
            className,
            ...rest
        } = this.props.children.props;
        introStepClassName = ((className || '') + introStepClassName).replace(/\s+/, ' ');

        return React.cloneElement(this.props.children,
                Object.assign({},
                    {
                        className: introStepClassName,
                        ...rest
                    }
            ));
    }
}

module.exports = {
    start: () => {
        introJs.start();
    },
    IntroWrap
};