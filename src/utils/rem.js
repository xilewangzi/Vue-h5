
import $ from "../../node_modules/jquery";

(function () {
    const scale = 1 / devicePixelRatio;
    const designWidth = 750;
    const oneRem2Px = 100;
  
    function autoRem() {
        const deviceWidth = $(window).width();
        window.rootSize = deviceWidth / designWidth * oneRem2Px;
        document.documentElement.style.fontSize = rootSize + 'px';
    }
    let timer = null;
    window.addEventListener('resize', function () {
        timer && clearTimeout(timer);
        timer = setTimeout(function () {
            autoRem();
        }, 500)
    })
    autoRem();
  })();