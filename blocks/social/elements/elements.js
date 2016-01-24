SV.controller('tags-editor', function(el) {

    $(el).find("span.tw").click(function(e) {
        $(e.target).parent().remove();
    });

    $(el).find('.new-tag').keyup(function(e){
        if(e.keyCode == 13) {
//            $(this).trigger("enterKey");
            var input = $(el).find('.new-tag');
            var value = input.val();
            input.val("");
            var t = $("<span class='tw'><span class='tb'>"+value+"</span><i class='fa fa-times'></i></span>");
            input.before(t);

            t.click(function() {
                $(el).find(t).remove();
            });
        }
    });
});
SV.controller('rating', function(el) {
    this.on = {};
    this.on["star"] = function(e, next) {
        var i = $(e.target).attr("i");
        SV.fire(el, "rating", {rate:20+i*20});
    };
});
SV.controller('tags', function(el) {
    this.on = {};
    this.on["tag"] = function(e, next) {
        var t = $(e.target).text();
        SV.fire(el, "tags", {tag:t});
    };
});