SV.controller('grid', function(el) {

    var self = this;

    var cols = $(el).find(".col-header");
    var w = $(el).outerWidth();
    var activeColumn;

    var recalcPos = function() {
        var l = 0;
        var colSort = cols.sort(function(a, b) {
            return $(a).offset().left - $(b).offset().left;
        });
        for (var c=0; c < colSort.length; c++) {
            $(colSort[c]).css("left", l);
            l += $(colSort[c]).width();
        }
        $(el).find(".grid-header, table").width(l);
    };

    var recalcTW = function() {
        var tCols = $(el).find("table col");
        for (var c = 0; c < cols.length; c++) {
            $(tCols[c]).width($(cols[c]).width());
        }
    };

    var l = 0;
    for (var c=0; c < cols.length; c++) {
        var w1 = w / cols.length;
        $(cols[c]).width(w1);
    }
    recalcPos();
    recalcTW();


    cols.find(".sort").mousedown(function(e) {
        var col = $(e.target).parent();
        var w = col.position().left;
        var x = e.pageX;
        $(document).bind("mousemove", function(e1) {
            var x1 = x - e1.pageX;
            col.css("left", w - x1);
        });
        $(document).bind("mouseup", function(e1) {
            var x1 = x - e1.pageX;
            col.css("left", w - x1);
            recalcPos();
            recalcTW();
            $(document).unbind("mouseup");
            $(document).unbind("mousemove");
        });
        return false;
    });

    cols.mousedown(function(e) {
        var col = $(e.target);
        var w = col.width();
        var x = e.pageX;
        $(document).bind("mousemove", function(e1) {
            var x1 = x - e1.pageX;
            col.width(w - x1);
            recalcPos();
            recalcTW();
        });
        $(document).bind("mouseup", function(e1) {
            var x1 = x - e1.pageX;
            col.width(w - x1);
            $(document).unbind("mouseup");
            $(document).unbind("mousemove");
            recalcPos();
            recalcTW();
        });
    });



    this.on = {};

    this.on['sort'] = function(e, next) {
        var act = $(e.target);
        if (activeColumn && !act.parent().hasClass("active")) {
            activeColumn.removeClass("asc");
            activeColumn.removeClass("desc");
            activeColumn.parent().removeClass("active");
        }
        activeColumn = act;
        activeColumn.parent().addClass("active");
        var s = activeColumn;
        if (s.hasClass("asc")) {
            s.removeClass("asc");
            s.addClass("desc");
        } else {
            s.removeClass("desc");
            s.addClass("asc");
        }
    }

});