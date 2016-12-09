import Introjs from 'intro.js';
import 'intro.js/introjs.css';

const introJs = Introjs.introJs();

window.introJs = introJs;

introJs.setOptions({
    exitOnOverlayClick: false,
    nextLabel: '下一步',
    prevLabel: '上一步',
    skipLabel: '跳过',
    doneLabel: '完成'
});

introJs.onafterchange((targetElement) => {
    const url = targetElement.dataset['url'];
    if(url) {
        window.location = url;
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