$.fn.setCursorPosition = function(pos) {
    this.each(function(index, elem) {
        var el = elem;
        var range = document.createRange();
        var sel = window.getSelection();
        range.setStart(el.childNodes[0], el.childNodes[0].nodeValue.length);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    });
    return this;
};

SV.controller('comments', function(el) {

    this.on = {};

    this.on["comments-all"] = function(e, next) {
        SV.render("social/components/comments:comments", e, function(err, html) {
            if (err) return console.error(err.message);
            html = $(html).find(".all-comments").html();
            SV.html($(el).find(".all-comments")[0], html);
        });
    };

    this.on["comment-reply"] = function(e, next) {
        var oldForm = $(el).find(".new-comment.reply");
        if (oldForm.length) {
            oldForm.remove();
            SV.destroyControllers(oldForm);
        }

        var author = $(e.target).parents(".comment").find(".author").text();
        if (author) author += ", ";
        SV.render("social/components/comments:new-comment", {to: author, reply:"reply"}, function(err, html) {
            if (err) return console.error(err.message);
            var el = $(html);
            var w = $(e.target).parents(".comment").find(".reply-wrapper");
            var r = $(e.target).parents(".reply");
            if (r.length) {
                $(r[0]).after(el);
            } else {
                $(w).prepend(el);
            }
            SV.initControllers($(w).find(".new-comment"));
            w.find(".new-comment .textarea > div").focus();
            w.find(".new-comment .textarea > div").setCursorPosition(4);
        });
    };

});

SV.controller('new-comment', function(el) {
    this.on = {};
    var id = $(el).parents(".comment").attr("id");
    if (id) {
        $(el).keyup(function (e) {
//        if (e.keyCode == 13) $('.save').click();
            if (e.keyCode == 27) {
                $(el).remove();
                SV.destroyControllers($(el));
            }
        });
    }

//    $(el).find(".textarea > div").get(0).focus();


    this.on["comment-submit"] = function(e, next) {
        var ce = $(el).find(".textarea > div");
        var text = ce.text();
        SV.http.emmit("comments-add", {replyTo: id, text: text});
        ce.text("");
    }

});