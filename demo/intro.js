import Introjs from 'intro.js/intro';
import 'intro.js/introjs.css';

const introJs = Introjs.introJs();

window.introJs = introJs;

introJs.setOptions({
    exitOnOverlayClick: false,
    nextLabel: '下一步',
    prevLabel: '上一步',
    skipLabel: '跳过',
    doneLabel: '完成',
    showBullets: false
});

introJs.onbeforechange((targetElement) => {
    const url = targetElement.dataset['url'];
    if(url) {
        window.location = url;
    }
    if(targetElement.tagName === 'A') {
        setTimeout(() => {
            const tempClass = targetElement.className === 'active' ? 'active ' : '';
            targetElement.setAttribute('class', tempClass + 'introjs-showElement introjs-relativePosition');
        }, 100);
    }
});
introJs.onNextButtonClick((ele) => {
    if(ele) {
        const click = ele.dataset['click'];
        if(click) {
            ele.click();
        }
    }
});

introJs.oncomplete(() => {
    if(introJs._currentStep === 2) {
        setTimeout(() => {
            introJs.goToStep(3).start();
        }, 0);
    }
});


module.exports = {
    start: () => {
        introJs.start();
    }
};