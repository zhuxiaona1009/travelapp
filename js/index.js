/*--String.prototype--*/
~function (pro) {
    function queryURLParameter() {
        var reg = /([^?=&#]+)=([^?=&#]+)/g,
            obj = {};
        this.replace(reg, function () {
            obj[arguments[1]] = arguments[2];
        });
        return obj;
    }

    pro.queryURLParameter = queryURLParameter;
}(String.prototype);

/*--SWIPER--*/
var swiperRender = (function () {
    var $swiper = $('#swiper'),
        $return = $swiper.children('.return');

    //->change:实现每一屏幕滑动切换后控制页面的动画
    function change(example) {
        var slidesAry = example.slides,
            activeIndex = example.activeIndex;
        $.each(slidesAry, function (index, item) {
            if (index === activeIndex) {
                item.id = 'page' + (activeIndex + 1);
                return;
            }
            item.id = null;
        });
    }

    return {
        init: function (index) {
            $swiper.css('display', 'block');
            //->初始化SWIPER实现六个页面之间的切换
            var mySwiper = new Swiper('.swiper-container', {
                effect: 'coverflow',
                onTransitionEnd: change,
                onInit: change
            });
            index = index || 0;
            mySwiper.slideTo(index, 0);
        }
    }
})();

var urlObj = window.location.href.queryURLParameter(),
    page = parseFloat(urlObj['page']);

if (page === 0 || isNaN(page)) {
    swiperRender.init(0);
}



