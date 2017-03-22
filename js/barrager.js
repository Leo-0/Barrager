;
(function($) {
	var Barrager = function(ele, opt) {
		this.$element = ele;
		this.defaults = {
			color: "#fff",
			randColor: false,
			duration: 5000,
			variableSpeed: false,
			close: true,
			position: 0,
			info: "Hello world!我是弹幕啦！"
		};
		this.options = $.extend({}, this.defaults, opt);
	};
	Barrager.prototype = {
		barrage: function() {
			// 定义barrage的容器
			var time = new Date().getTime();
			var barragerbox_id = "barragerbox_" + time;
			var barrager_id = "barrager_" + time;
			var id = "#" + barragerbox_id;
			var $barragerbox = $("<div class='barragerbox' id='" + barragerbox_id + "'></div>");
			var $barrager = $("<div class='barrager' id='" + barrager_id + "'></div>");
			// 计算字符串的宽高
			var fontSize = "1rem";
			var info = this.options.info;
			var $temp = $("<div class='temp' style='padding:0;border:none;'></div>").css({
				visibility: "hidden",
				position: "absolute",
				"font-size": fontSize
			}).text(info).appendTo(this.$element);
			var info_width = $temp.width();
			var info_height = $temp.height();
			$temp.remove();
			// 定义窗口宽高
			var window_height = $(window).height() - 100;
			var window_width = $(window).width() + info_width;
			// 计算字符串运动距离
			var this_height = (window_height > this.$element.height()) ? this.$element.height() : window_height;
			var this_width = (window_width > this.$element.width()) ? this.$element.width() : window_width;
			// 定义初始位置
			var this_position = (this.options.position === 0) ? Math.floor(Math.random() * (this_height - 80) + 40) : this.options.position;
			// 添加容器
			this.$element.append($barragerbox);
			$barragerbox.css({
				bottom: this_position,
				right: -(info_width + 90),
				width: info_width + 90
			});
			$barragerbox.append($barrager);
			// 判断是否添加头像
			if (this.options.portrait) {
				var img = this.options.portrait;
				var imgId = "img_" + time;
				var $img = $("<img src='' alt='' >");
				$img.load(function() {
					$barrager.append("<a class='portrait' id='" + imgId + "'href='javascript:;'></a>");
					$(id + " .barrager .portrait").append($img);
				}).error(function() {
					console.log("图片加载不出来");
				}).attr("src",img);
			}
			// 添加信息
			$barrager.append("<div class='content'></div>");
			var $content = $("<a class='info' href='' target='_blank' title=''></a>").appendTo(id + ' .barrager .content');
			var content_href = this.options.href;
			var content_id = this.options.id;
			$content.attr({
				href: content_href,
				title: info,
				id: content_id,
			}).text(info);
			$content.css("font-size", fontSize);
			var color = this.options.color;
			if (this.options.randColor) {
				color = randColor(0, 255);
			}
			$content.css("color", color);
			// 判断是否添加关闭按钮
			if (this.options.close) {
				$barrager.append("<div class='close'></div>");
			}
			$(id + " .barrager .close").click(function(event) {
				$(id).remove();
			});
			// 动画
			var start = new Date().getTime();
			var duration = this.options.duration;
			if (this.options.variableSpeed) {
				duration = randSpeed(0, 10);
			}
			$(id).animate({
				right: this_width
			}, duration, "swing", function() {
				$(id).remove();
			});
			// 暂停
			var overed = false;
			$barragerbox.mouseover(function(event) {
				$(id).stop(true);
				if (!overed) {
					overed = true;
					var end = new Date().getTime();
					duration = duration - (end - start);
				}
			});
			// 动画
			$barragerbox.mouseout(function(event) {
				overed = false;
				start = new Date().getTime();
				$(id).animate({
					right: this_width
				}, duration, "swing", function() {
					$(id).remove();
				});
			});
			return this.$element;
		}
	};

	function randColor(min, max) {
		var temp;
		if (min > max) {
			temp = min;
			min = max;
			max = min;
		}
		min = min > 255 ? 255 : min;
		max = max > 255 ? 255 : max;
		var r = Math.floor(Math.random() * (max - min)) + min;
		var g = Math.floor(Math.random() * (max - min)) + min;
		var b = Math.floor(Math.random() * (max - min)) + min;
		return "rgb(" + r + "," + g + "," + b + ")";
	}

	function randSpeed(min, max) {
		var temp;
		if (min > max) {
			temp = min;
			min = max;
			max = min;
		}
		min = min < 4 ? 4 : min;
		max = max < 4 ? 4 : max;
		min = min > 10 ? 10 : min;
		max = max > 10 ? 10 : max;
		var speed = Math.round(Math.random() * (max - min) + min);
		return speed * 1000;
	}
	$.fn.barragers = function(options) {
		var barrger = new Barrager(this, options);
		return barrger.barrage();
	};
	$.fn.barragers.clearAll = function() {
		$(".barragerbox").remove();
	};
})(jQuery);