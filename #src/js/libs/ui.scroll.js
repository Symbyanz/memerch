//Событие scrollStop
//=================================================================
$.fn.scrollStop = function (e) {
	var $that = $(this),
		$this = $that;

	$this.scroll(function (event) {
		clearTimeout($this.data('scrollTimeout'));
		$this.data('scrollTimeout', setTimeout(e.bind($that), 250, event));
	});
};


//Стилизованный скролл
//=================================================================
$.fn.uiScroll = function()
{
	$(this).each(function()
	{

		var	$e = $(this),
				e_init_height = $e.height();

		//position: relative если была static
		if($e.css('position') == 'static')
		{
			$e.css('position', 'relative');
		}

		//overflow: hidden, если не hidden
		if($e.css('overflow') != 'hidden')
		{
			$e.css('overflow', 'hidden');
		}

		/*if(parseFloat($e.css('min-height')) > 0)
			$e.css('min-height', $e.height());
		else
			$e.css('min-height', e_init_height);*/

		//Вставляем элементы скролла, если их нет
		if($e.children('.ui-scroll[data-ui-role="main"]').length == 0)
		{
			$e.html('\
			<div class="ui-scroll" data-ui-role="main">\
				<div class="ui-scroll__inner" data-ui-role="inner">'
					+ $e.html() +
				'</div>\
			</div>\
			<div class="ui-scroll__v_track" data-ui-role="v_track">\
				<div class="ui-scroll__v_native_drag" data-ui-role="v_native_drag"></div>\
				<div class="ui-scroll__v_drag" data-ui-role="v_drag"></div>\
			</div>\
			<div class="ui-scroll__h_track" data-ui-role="h_track">\
				<div class="ui-scroll__h_native_drag" data-ui-role="h_native_drag"></div>\
				<div class="ui-scroll__h_drag" data-ui-role="h_drag"></div>\
			</div>');
		}

		//Определяем элементы скролла
		var	$main = $e.children('[data-ui-role="main"]'),
				$inner = $main.children('[data-ui-role="inner"]'),
			$v_track = $e.children('[data-ui-role="v_track"]'),
				$v_drag = $v_track.children('[data-ui-role="v_drag"]'),
				$v_native_drag = $v_track.children('[data-ui-role="v_native_drag"]'),
				scrollTop = 0,
				scrollLeft = 0,
			$h_track = $e.children('[data-ui-role="h_track"]'),
				$h_drag = $h_track.children('[data-ui-role="h_drag"]'),
				$h_native_drag = $h_track.children('[data-ui-role="h_native_drag"]');

		//Рисуем вертикальный скролл
		function drawVerticalScroll()
		{
			if ($inner.height() > $main.height()) {

				$v_track.show();

				//Задаём высоту вертикальной «таскалке»
				$v_drag.css({
					'height': $v_track.height() / ($inner.height() / $v_track.height())
				});

				//Задаём высоту содержимого нативному вспомогательному скроллу
				$v_native_drag.html('<div style="width: 16px; height: ' + $inner.height() + 'px"></div>');

				//При скролле колёсиком перемещаем «таскалку»
				$main.scroll(function () {
					scrollTop = $v_track.height() / (-1 * ($inner.height() / $inner.position().top)) + 1;
					$v_drag.css({
						'top': scrollTop
					});
					$e.addClass('now_scrolling');
				});
				$main.scrollStop(function()
				{
					$v_native_drag.scrollTop($main.scrollTop());
					$e.removeClass('now_scrolling');
				});

				//При скролле с нажатием клавишы мышки перемещаем «таскалку»
				$v_native_drag.scroll(function () {
					$main.scrollTop($v_native_drag.scrollTop());
				});

			}
			else
			{
				$v_track.hide();
			}
		}

		//Рисуем горизонтальный скролл
		function drawHorizontalScroll()
		{
			if ($inner.width() > $main.width()) {

				$h_track.show();

				//Задаём ширину горизонтальной «таскалке»
				$h_drag.css({
					'width': $h_track.width() / ($inner.width() / $h_track.width())
				});

				//Задаём высоту содержимого нативному вспомогательному скроллу
				$h_native_drag.html('<div style="width: ' + $inner.width() + 'px; height: 16px"></div>');

				//При скролле колёсиком перемещаем «таскалку»
				$main.scroll(function () {
					scrollLeft = $h_track.width() / (-1 * ($inner.width() / $inner.position().left)) + 1;
					$h_drag.css({
						'left': scrollLeft
					});
					$e.addClass('now_scrolling');
				});
				$main.scrollStop(function()
				{
					$h_native_drag.scrollLeft($main.scrollLeft());
					$e.removeClass('now_scrolling');
				});

				//При скролле с нажатием клавишы мышки перемещаем «таскалку»
				$h_native_drag.scroll(function () {
					$main.scrollLeft($h_native_drag.scrollLeft());
				});

			}
			else
			{
				$h_track.hide();
			}
		}

		//При загрузке страницы
		setTimeout(function(){
			drawVerticalScroll();
			drawHorizontalScroll();
		}, 500);

		//Переинициализируем при ресайзе вложенного контейнера по вертикали
		var old_height = $inner.height();
		window.setInterval(function()
		{

			if(old_height != $inner.height())
			{
				drawVerticalScroll();
			}
			old_height = $inner.height();
		}, 500);

		//Переинициализируем при ресайзе вложенного контейнера по горизонтали
		var old_width = $inner.width();
		window.setInterval(function()
		{
			if(old_width != $inner.width())
			{
				drawHorizontalScroll();
			}
			old_width = $inner.width();
		}, 500);

		//Переинициализируем при ресайзе окна
		$(window).resize(function()
		{
			drawVerticalScroll();
			drawHorizontalScroll();
		});

	});

}