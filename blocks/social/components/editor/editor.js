SV.controller('editor', function(el) {

    var ta = $(el).find(".edit-area");
    var range = null;
    this.on = {};

    ta.on('paste', function (e) {
        var _e = e.originalEvent;
        e.preventDefault();
        if (window.clipboardData) {
            var content = window.clipboardData.getData('Text');
            document.selection.createRange().pasteHTML(content);
        } else {
            var content = _e.clipboardData.getData('text/plain');
            document.execCommand('insertText', false, content);
        }
    });

    ta.bind('dragover drop', function(event){
        event.preventDefault();
        return false;
    });

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
        });
    });

    var goTopEl = function(el) {
        if (el.parentNode !== ta[0])
            return goTopEl(el.parentNode);
        return el;
    };

    var remove = function(el, cont, offset, a) {
        if (el.data && el.data === cont.data) {
            a.fl = !a.fl;
            el.data = a.fl ? el.data.substr(0, offset) : el.data.substr(offset);
        } else if (el.childNodes.length == 0 && a.fl) {
            el.parentNode.removeChild(el);
        } else {
            for (var i = 0; i < el.childNodes.length; i++) {
                remove(el.childNodes[i], cont, offset, a);
            }
        }
    };

    var p = function(e, pos, h) {
        var pl = range.toString();
        var st = null;
        var end = null;

        if (range.startContainer === range.endContainer) {
            end = goTopEl(range.startContainer);
            st = end.cloneNode(true);
            e.insertBefore(st, end);
        } else {
            st = goTopEl(range.startContainer);
            end = goTopEl(range.endContainer);
        }

        remove(st, range.startContainer, range.startOffset, {fl:false});
        remove(end, range.endContainer, range.endOffset, {fl:true});
        var _pl = $(h(pl))[0];
        e.insertBefore(_pl, end);
    };

});