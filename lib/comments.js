var aloha = require("../../sv-aloha");

var id = 0;
var comments = {};

module.exports = function(tahoe, app) {

    var self = this;

    tahoe.use("comments-get", function(attrs, cb) {
        self.get(attrs, function(err, data) {
            cb(null, data);
        });
    });

    app.use(aloha.http("comments-add", function(data, cb) {
        self.save(data, function(err, id) {
            cb("comments-all", {comments: comments});
        });
    }));

    this.isAuthorized = function(data) {
        return true;
    };

    this.getUser = function(data) {
        return "Pupkin";
    };

    this.save = function(data, cb) {
        var c = {
            id: id++,
            author: self.getUser(data),
            text: data.text,
            date: new Date().toString()
        };

        if (data.replyTo) {
            var p = comments[data.replyTo];
            if (!p.replies) {
                p.replies = {};
            }
            p.replies[c.id] = c;
        } else {
            comments[c.id] = c;
        }
        cb(null, id);
    }

    this.get = function(data, cb) {
        cb(null, {comments: comments, auth: self.isAuthorized(data)});
    }

};