SV.controller('editor', function(el) {

    var ta = $(el).find(".edit-area");
    var range = null;
    this.on = {};

    this.on["strong"] = function(e, next) {
        p(ta[0], {range: range}, function(text) {
            return "<strong>" + text + "</strong>";
        });
    };

    this.on["img"] = function(e, next) {
        p(ta[0], {range: range}, function(text) {
            return "<img src='" + text + "'/>";
        });
    };

    this.on["code"] = function(e, next) {
        p(ta[0], {range: range}, function(text) {
            return "<pre>" + text + "</pre>";
        });
    };

    this.on["link"] = function(e, next) {
        var _ok = function() {
            $(ta).find(".link-form .ok").click(function(e) {
                $(ta).attr("contenteditable", "true");
                var name = $(ta).find(".link-form [name='name']").val();
                var href = $(ta).find(".link-form [name='href']").val();
                $(ta).find(".link-form").replaceWith("<a href='" + href + "'>" + name + "</a>");
                _clk();
            });
        };

        var _clk = function() {
            $(ta).find("a").click(function(e) {
                $(e.target).unbind("click");
                var href = $(e.target).attr("href");
                var name = $(e.target).text();
                var _el = $(el).find(".link-form-wrp").clone();
                _el.find(".link-form [name='name']").attr("value", name);
                _el.find(".link-form [name='href']").attr("value", href);
                $(e.target).replaceWith(_el.html());
                _ok();
                return false;
            });
        };
        p(ta[0], {range: range}, function(text) {
            var _el = $(el).find(".link-form-wrp").clone();
            _el.find(".link-form [name='name']").val(text);
            $(ta).attr("contenteditable", "false");
            return _el.html();
        });
        _ok();
    };

    $(ta).on("mousedown", function() {
        $(window).on("mouseup", function() {
            $(window).unbind("mouseup");
            range = window.getSelection().getRangeAt(0);
//            var tb = $(el).find(".tool-bar");
//            tb.css({top: event.pageY-$(ta).offset().top});
//            $(tb).animate({top: event.pageY-$(ta).offset().top}, 300, function() {
//            });
//            tb.show();
        });
    });

//    $(ta).on("mousemove", function() {
//        var tb = $(el).find(".tool-bar");
//            tb.css({top: event.pageY-$(ta).offset().top});
//    });

    var p = function(e, pos, h) {
        var pl = range.toString();
        var t = range.startContainer.data;
        var st = range.startOffset;
        var end = range.endOffset;

        var t0 = t.substr(0, st);
        var t1 = "__$$$__";
        if (t.length > end) {
            var t2 = t.substr(end);
            var clone = range.startContainer.cloneNode(true);
            range.startContainer.parentNode.insertBefore(clone, range.startContainer);
            clone.data = t0;
            range.startContainer.data = t2;
            var _pl = $(h(pl))[0];
            range.startContainer.parentNode.insertBefore(_pl, range.startContainer);
//            t1 += t2;
        }

//        if (range.startContainer !== range.endContainer) {
//            t = range.endContainer.data;
//            range.endContainer.data = t.substr(end);
//        }

//        range.startContainer.data = t0+t1;
//        var html = $(e).html();
//        html = html.replace("__$$$__", "<strong>" + pl + "</strong>");
//        $(e).html(html);
    };

});