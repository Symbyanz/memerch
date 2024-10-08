// Open modal windows
function popup($openers) {

    $openers.each(function () {

        var
            $e = $(this),
            id = $e.attr('data-popup-open'),
            $popup = $('.ui-popup__wrapper[data-id="' + id + '"]');

        $e.click(function () {

            $popup.addClass('-open');

        });

    });

}


$(function () {


    var is_mobile = ($(window).width() <= 1024);


    // Show sidebar navigation
    if ($('.sidebar-left').length > 0) {

        var
            $navigation = $('.sidebar-left__navigation'),
            $trigger = $navigation.find('.sidebar-left__navigation__trigger'),
            $overlay = $navigation.find('.sidebar-left__navigation__overlay');

        $trigger.click(function () {

            $navigation.toggleClass('-open');

        });

        $overlay.click(function () {

            $navigation.removeClass('-open');

        });

        $(document).keyup(function (event) {

            if (event.keyCode === 27)
                $navigation.removeClass('-open');

        });

    }


    // Styled scroll
    if ($('[data-ui-role="scroll"]').length > 0 && !is_mobile) {

        $('[data-ui-role="scroll"]').each(function () {

            var
                $e = $(this);

            $e.uiScroll();

        });

    }


    // Vertical Slider
    if ($('.ui-v-slider').length > 0) {

        var
            $sliders = $('.ui-v-slider');

        $sliders.each(function () {

            var
                $e = $(this),
                $content = $e.find('.ui-v-slider__content'),
                $slides = $content.children('.ui-v-slider__content__item'),
                $number = $e.find('.ui-v-slider__number'),
                $total = $e.find('.ui-v-slider__total'),
                $up = $e.find('.ui-v-slider__arrow.-up'),
                $down = $e.find('.ui-v-slider__arrow.-down'),
                $next,
                $prev,
                $active;

            $total.text($slides.length);

            if ($content.children('.ui-v-slider__content__item.-show').index() === 0)
                $up.fadeOut();

            function goNext(from) {

                var delay = (from === 'keyboard' || 'mouse') ? 750 : 1500;

                if (!$('html').hasClass('-scroll-in-progress') && $e.closest('.catalog__content').hasClass('-show')) {

                    $('html').addClass('-scroll-in-progress');

                    $up.fadeIn();

                    $active = $content.children('.ui-v-slider__content__item.-show');

                    $next = ($active.next().index() !== -1) ? $active.next() : $content.children('.ui-v-slider__content__item:first');

                    $slides.removeClass('-show');
                    $next.addClass('-show');

                    $number.text(($active.next().index() !== -1) ? $active.next().index() + 1 : 1);

                    setTimeout(function () {
                        $('html').removeClass('-scroll-in-progress');
                    }, delay);

                }

            }

            function goPrev(from) {

                var delay = (from === 'keyboard' || 'mouse') ? 750 : 1500;

                if (!$('html').hasClass('-scroll-in-progress') && $e.closest('.catalog__content').hasClass('-show')) {

                    $('html').addClass('-scroll-in-progress');

                    $down.fadeIn();

                    $active = $content.children('.ui-v-slider__content__item.-show');

                    $prev = ($active.prev().index() !== -1) ? $active.prev() : $content.children('.ui-v-slider__content__item:last');

                    $slides.removeClass('-show');
                    $prev.addClass('-show');

                    $number.text(($active.prev().index() !== -1) ? $active.prev().index() + 1 : $slides.length);

                    setTimeout(function () {
                        $('html').removeClass('-scroll-in-progress');
                    }, delay);

                }

            }

            $up.click(function () {

                goPrev('mouse');

            });

            $down.click(function () {

                goNext('mouse');

            });

            // Change slides on mouse wheel
            window.addEventListener('wheel', function (e) {

                //Up
                if (e.deltaY < 0)
                    goPrev('wheel');

                //Down
                else if (e.deltaY > 0)
                    goNext('wheel');

            });

            // Change slides on arrows keys push
            $(document).keydown(function (e) {

                //Up or left
                if (e.keyCode == 38 || e.keyCode == 37)
                    goPrev('keyboard');

                //Down or right
                else if (e.keyCode == 40 || e.keyCode == 39)
                    goNext('keyboard');

            });

            // Change slides on swipe
            window.addEventListener('touchstart', function (event) {
                touch_start = event.changedTouches[0];
            }, false);
            window.addEventListener('touchend', function (event) {

                touch_end = event.changedTouches[0];

                var
                    x = Math.abs(touch_start.pageX - touch_end.pageX),//X axis
                    y = Math.abs(touch_start.pageY - touch_end.pageY);//Y axis

                if (x > 20 || y > 20) {

                    //Swipe on Y axis
                    if (x < y) {

                        //Swipe up
                        if (touch_end.pageY > touch_start.pageY)
                            goPrev('swipe');

                        //Swipe down
                        else
                            goNext('swipe');

                    }

                }

            }, false);

        });

    }


    // Vertical Slider
    if ($('.ui-h-slider').length > 0) {

        var
            $sliders = $('.ui-h-slider');

        $sliders.each(function () {

            var
                $e = $(this),
                $content = $e.find('.ui-h-slider__content'),
                $slides = $content.children('.ui-h-slider__content__item'),
                $left = $e.find('.ui-h-slider__arrow.-left'),
                $right = $e.find('.ui-h-slider__arrow.-right'),
                $next,
                $prev,
                $active,
                $preview = $e.find('.ui-h-slider__previews'),
                $previews = $preview.children('.ui-h-slider__previews__item');

            function preview(index) {

                $previews.removeClass('-active');
                $previews.eq(index).addClass('-active');

            }

            function goNext(from) {

                var delay = (from === 'keyboard' || 'mouse') ? 750 : 1500;

                if (!$('html').hasClass('-scroll-in-progress') && $e.closest('.product__slider').hasClass('-show')) {

                    $('html').addClass('-scroll-in-progress');

                    $active = $content.children('.ui-h-slider__content__item.-show');

                    $next = ($active.next().index() !== -1) ? $active.next() : $content.children('.ui-h-slider__content__item:first');

                    $slides.removeClass('-show');
                    $next.addClass('-show');

                    preview($next.index());

                    setTimeout(function () {
                        $('html').removeClass('-scroll-in-progress');
                    }, delay);

                }

            }

            function goPrev(from) {

                var delay = (from === 'keyboard' || 'mouse') ? 750 : 1500;

                if (!$('html').hasClass('-scroll-in-progress') && $e.closest('.product__slider').hasClass('-show')) {

                    $('html').addClass('-scroll-in-progress');

                    $active = $content.children('.ui-h-slider__content__item.-show');

                    $prev = ($active.prev().index() !== -1) ? $active.prev() : $content.children('.ui-h-slider__content__item:last');

                    $slides.removeClass('-show');
                    $prev.addClass('-show');

                    preview($prev.index());

                    setTimeout(function () {
                        $('html').removeClass('-scroll-in-progress');
                    }, delay);

                }

            }

            function showSlide(index) {

                $slides.removeClass('-show');
                $slides.eq(index).addClass('-show');

            }

            $left.click(function () {

                goPrev('mouse');

            });

            $right.click(function () {

                goNext('mouse');

            });

            $previews.each(function () {

                var
                    $p = $(this);

                $p.click(function () {

                    $previews.removeClass('-active');
                    $p.addClass('-active');

                    showSlide($p.index());

                });

            });

            // Change slides on arrows keys push
            $(document).keydown(function (e) {

                //Up or left
                if (e.keyCode == 38 || e.keyCode == 37)
                    goPrev('keyboard');

                //Down or right
                else if (e.keyCode == 40 || e.keyCode == 39)
                    goNext('keyboard');

            });

            // Change slides on swipe
            window.addEventListener('touchstart', function (event) {
                touch_start = event.changedTouches[0];
            }, false);
            window.addEventListener('touchend', function (event) {

                touch_end = event.changedTouches[0];

                var
                    x = Math.abs(touch_start.pageX - touch_end.pageX),//X axis
                    y = Math.abs(touch_start.pageY - touch_end.pageY);//Y axis

                if (x > 20 || y > 20) {

                    //Swipe on X axis
                    if (x > y) {

                        //Swipe right
                        if (touch_end.pageX > touch_start.pageX)
                            goPrev('swipe');

                        //Swipe left
                        else
                            goNext('swipe');

                    }

                }

            }, false);

        });

    }


    // Modal Windows
    if ($('.ui-popup__wrapper').length > 0) {

        var
            $openers = $('[data-popup-open]'),
            $closers = $('[data-popup-action="close"]'),
            $popups = $('.ui-popup__wrapper');

        // Open
        popup($openers);

        // Close via cross click
        $closers.each(function () {

            var
                $e = $(this),
                $popup = $e.closest('.ui-popup__wrapper');

            $e.click(function () {

                $popup.removeClass('-open');

            });

        });

        // Close via background click
        $popups.each(function () {

            var
                $e = $(this);

            $e.click(function (event) {

                if ($(event.target).closest('.ui-popup').length == 0)
                    $e.removeClass('-open');

            });

        });

        // Close via ESC button press
        $(document).keydown(function (event) {

            if (event.keyCode == 27)
                $popups.removeClass('-open');

        });

    }


});