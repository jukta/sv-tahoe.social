SV.controller('panel', function(el) {

    this.collapsed = false;
    var self = this;

    this.on = {};

    this.on['collapse'] = function(e, next) {
        if (self.collapsed) {
            $(el).find(".panel-body").show();
            $(el).find(".collapse").removeClass("collapse-on");
        } else {
            $(el).find(".panel-body").hide();
            $(el).find(".collapse").addClass("collapse-on");
        }
        self.collapsed = !self.collapsed;
    };

});