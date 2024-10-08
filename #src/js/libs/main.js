$(function () {
    var isMobile = ($(window).width() <= 1024);

    var $mainPage = $('.main.slider'),
        $homePage = $('.homepage.slide'),
        $aboutPage = $('.about.slide'),
        $arrowUp = $('.sidebar-right__navigation__arrow.-up'),
        $arrowDown = $('.sidebar-right__navigation__arrow.-down'),
        $viewMerch = $('.about__left__button'),
        $aboutLink = $('.sidebar-right__title.-about'),
        $goBack = $('.about__left__back-link'),
        $mainPreviewItem = $('.main__previews__item');

    function goNextSlide(from) {
        var delay = (from === 'keyboard' || 'mouse') ? 750 : 1300;

        if (!$('html').hasClass('-scroll-in-progress')) {
            $('html').addClass('-scroll-in-progress');

            if (isHomePage()) {
                if (!isMobile) {
                    showPreviewAboutPage(1);
                }
                else {
                    showDetailAboutPage(1);
                }
            }
            else if (isPreviewAboutPage()) {
                var index = getActiveAboutPageIndex();
                showDetailAboutPage(index);
            }
            else if (isDetailAboutPage() && !isLastPage()) {
                var nextIndex = getActiveAboutPageIndex() + 1;

                if (!isMobile) {
                    showPreviewAboutPage(nextIndex);
                }
                else {
                    showDetailAboutPage(nextIndex);
                }
            }

            setTimeout(function () {
                $('html').removeClass('-scroll-in-progress');
            }, delay);
        }
    }

    function goPrevSlide(from) {
        var delay = (from === 'keyboard' || 'mouse') ? 750 : 1300;

        if (!$('html').hasClass('-scroll-in-progress')) {
            $('html').addClass('-scroll-in-progress');

            if (isPreviewAboutPage()) {
                if (getActiveAboutPageIndex() == 1) {
                    showHomePage();
                }
                else {
                    var prevIndex = getActiveAboutPageIndex() - 1;
                    showDetailAboutPage(prevIndex);
                }
            }
            else if (isDetailAboutPage()) {
                if (!isMobile) {
                    var index = getActiveAboutPageIndex();
                    showPreviewAboutPage(index);
                }
                else {
                    var prevIndex = getActiveAboutPageIndex() - 1;
                    showDetailAboutPage(prevIndex);
                }
            }

            setTimeout(function () {
                $('html').removeClass('-scroll-in-progress');
            }, delay);
        }
    }

    function isHomePage() {
        return $mainPage.hasClass('-show-homepage');
    }

    function isPreviewAboutPage() {
        return $mainPage.hasClass('-show-about');
    }

    function isDetailAboutPage() {
        return $mainPage.hasClass('-show-catalog');
    }

    function isLastPage() {
        var lastIndex = $aboutPage.length;

        return getActiveAboutPageIndex() == lastIndex;
    }

    function getActiveAboutPageIndex() {
        return $aboutPage.filter('.-active').data('index');
    }

    function showHomePage() {
        $mainPage
            .removeClass('-show-catalog')
            .removeClass('-show-about')
            .addClass('-show-homepage');

        $aboutPage.removeClass('-active').removeClass('-catalog');

        $homePage.addClass('-active');

        $arrowUp.addClass('disabled');
        $arrowDown.removeClass('disabled');
    }

    function showPreviewAboutPage(index) {
        $mainPage
            .removeClass('-show-catalog')
            .removeClass('-show-homepage')
            .addClass('-show-about');

        $homePage.removeClass('-active');

        $aboutLink.filter('.-active').removeClass('-active');
        $aboutLink.filter('[data-index=' + index + ']').addClass('-active');

        $aboutPage.filter('.-active').removeClass('-active').removeClass('-catalog');
        $aboutPage.filter('[data-index=' + index + ']').addClass('-active');

        $arrowUp.removeClass('disabled');
        $arrowDown.removeClass('disabled');
    }

    function showDetailAboutPage(index) {
        $mainPage
            .removeClass('-show-about')
            .removeClass('-show-homepage')
            .addClass('-show-catalog');

        $homePage.removeClass('-active');

        $aboutLink.filter('.-active').removeClass('-active');
        $aboutLink.filter('[data-index=' + index + ']').addClass('-active');

        $aboutPage.filter('.-active').removeClass('-active').removeClass('-catalog');
        $aboutPage.filter('[data-index=' + index + ']').addClass('-active').addClass('-catalog');

        $arrowUp.removeClass('disabled');
        $arrowDown.removeClass('disabled');

        if (isLastPage()) {
            $arrowDown.addClass('disabled');
        }
    }

    function getAboutPageIndexByCode(code) {
        if ($aboutPage.filter('[data-code=' + code + ']').length) {
            return $aboutPage.filter('[data-code=' + code + ']').data('index');
        }

        return 0;
    }

    if ($mainPage.length) {
        // Arrow next
        $arrowDown.click(function () {
            goNextSlide('mouse');
        });

        // Arrow prev
        $arrowUp.click(function () {
            goPrevSlide('mouse');
        });

        $viewMerch.click(function () {
            if (isPreviewAboutPage()) {
                goNextSlide('mouse');
            }
        });

        $goBack.click(function () {
            goPrevSlide('mouse');
        });

        $mainPreviewItem.click(function () {
            var index = $(this).data('index');

            showDetailAboutPage(index);
        });

        // Change screens on mouse wheel
        window.addEventListener('wheel', function (e) {
            // Up
            if (e.deltaY < 0) {
                goPrevSlide('wheel');
            }
            // Down
            else if (e.deltaY > 0) {
                goNextSlide('wheel');
            }
        });

        // Change screens on arrows keys push
        $(document).keydown(function (e) {
            //Up or left
            if (e.keyCode == 38 || e.keyCode == 37) {
                goPrevSlide('keyboard');
            }
            //Down or right
            else if (e.keyCode == 40 || e.keyCode == 39) {
                goNextSlide('keyboard');
            }
        });

        // Change screens on swipe
        window.addEventListener('touchstart', function (event) {
            touch_start = event.changedTouches[0];
        }, false);

        window.addEventListener('touchend', function (event) {
            touch_end = event.changedTouches[0];

            var x = Math.abs(touch_start.pageX - touch_end.pageX), // X axis
                y = Math.abs(touch_start.pageY - touch_end.pageY); // Y axis

            if (x > 20 || y > 20) {
                //Swipe on Y axis
                if (x < y) {
                    //Swipe up
                    if (touch_end.pageY > touch_start.pageY) {
                        goPrevSlide('swipe');
                    }
                    //Swipe down
                    else {
                        goNextSlide('swipe');
                    }
                }
            }
        }, false);

        if (window.location.hash != '') {
            var code = window.location.hash.replace('#', '');
            var index = getAboutPageIndexByCode(code);

            if (index > 0) {
                showDetailAboutPage(index);
            }
        }
    }
});

$(document).ready(function () {
    $('.contacts-tabs__item').click(function (e) {
        e.preventDefault();
        var target = $(this).data('target');

        $(this).addClass('active');
        $('.contacts-tab').fadeOut();
        setTimeout(() => {
            $('#' + target).fadeIn();
        }, 400);

    });

    $.fancybox.defaults.loop = true;

    // $('.ui-size__link').click(function (e) { 
    //     e.preventDefault();
    //     var $e = $(this);
    //     $('.sizes-container-wrapper').fadeIn();
    //     $('.sizes-container-wrapper').css('display', 'flex');
    // });


    // $('.sizes-container-wrapper .close').click(function (e) { 
    //     e.preventDefault();
    //     $('.sizes-container-wrapper').fadeOut();
    // });

});

function hideOnClickOutside(selector) {
    outsideClickListener = (event) => {
        $target = $(event.target);

        if (!$target.closest(selector).length && $(selector).hasClass('-show')) {
            $(selector).removeClass('-show');
            removeClickListener();
        }
    }

    removeClickListener = () => {
        document.removeEventListener('click', outsideClickListener)
    }

    document.addEventListener('click', outsideClickListener)
}