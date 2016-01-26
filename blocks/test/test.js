SV.controller('cont1', function(el) {

    this.on = {};

    this.on['but1'] = function(data, next) {
//        SV.http.emmit("type1", {a:"a"});
        SV.render("test:part", {h: "hello123"}, $(".container"));
    };

    this.on['res1'] = function(data, next) {
        console.log(data.b);
    }

});

SV.controller('ew', function(el) {

    this.on = {};

    this.on['123'] = function(data, next) {
        console.log("++ " + data.getHtml());
        console.log("-- " + data.getText());
    };

    this.on['rating'] = function(data, next) {
        console.log("rate " + data.rate);
    };
    this.on['tags'] = function(data, next) {
        console.log("tags " + data.tag);
    };

});

