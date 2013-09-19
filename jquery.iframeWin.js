/**
 * iframe - jQuery EasyUI
 * 
 * Licensed under the GPL:
 *   http://www.gnu.org/licenses/gpl.txt
 *
 * Copyright 2013 tavenli [ tavenli@qq.com ]
 * 基于Easy UI扩展实现的IFRAME弹出框
 *
 * Dependencies:
 * 	draggable
 * 	resizable
 * 	linkbutton
 * 	panel
 *  window
 */
(function($){

	$.iframe = {
		win: function(options) {
			var opts = $.extend({
				width: 300,
				height: 'auto',
				title: 'New IFrame Window',
				url:'',
				maximizable:false,
				minimizable:false,
				resizable:false,
				modal: true,
                onClosed:function(){}
			}, options || {});

            $.iframe.data.onClosed = opts.onClosed;

			var content = ''
						+ '<iframe scrolling="yes" frameborder="0" style="width:'+opts.width+'px;height:'+opts.height+'px;" src="'+ opts.url +'"></iframe>'
						+ '<div style="clear:both;"/>';
			var win = $('<div class="messager-body"></div>').appendTo('body');
			win.append(content);
			
			win.window({
				title: opts.title,
				width: opts.width,
				height: opts.height,
				modal: opts.modal,
				collapsible: false,
				minimizable: opts.minimizable,
				maximizable: opts.maximizable,
				resizable: opts.resizable,
				onClose: function(){
					setTimeout(function(){
						win.window('destroy');
                        $.iframe.data.onClosed();
					}, 100);
				}
			});
		
			$.iframe.data.win = win;
            return win;
		},
        maximize:function(){
            var _win = $.iframe.data.win;
            _win.window("maximize");
            //
            this.resizeFresh();
        },
        minimize:function(){
            $.iframe.data.win.window("minimize");
            this.resizeFresh();
        },
        restore:function(){
            $.iframe.data.win.window("restore");
        },
        resizeFresh:function(){
            var _win = $.iframe.data.win;
            var iframe = _win.find("iframe");
            iframe.css({width:_win.css("width"),height:_win.css("height")});
        },
		close:function(){
			var win = $.iframe.data.win;
			if(win){
				win.window('destroy');
                $.iframe.data.onClosed();
			}
		}


	
	};
	
	$.iframe.data = {
		win:null,
        onClosed:function(){}
	};
	
})(jQuery);
