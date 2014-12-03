var http = require('http');
var rurl = require('url');

module.exports = {

    re: [
        /^https?:\/\/[\w\.]*instagram\.com\/p\/([a-zA-Z0-9_-]+)/i,
        /^https?:\/\/instagr\.am\/p\/([a-zA-Z0-9_-]+)/i,
        /^https?:\/\/instagram\.com\/p\/([a-zA-Z0-9_-]+)$/i
    ],

    mixins: [
        "oembed-title",
        "oembed-site",
        "oembed-author",

        "favicon"
    ],

    provides: 'instagram_oembed',

    getData: function(url, cb) {
        var ops = rurl.parse("http://api.instagram.com/oembed");
        ops.query = {
            beta: true,
            url: url
        };

        iurl = rurl.format(ops);

        http.get(iurl,
            function(res) {

                if (res.statusCode != 200) {
                    return cb(res.statusCode);
                }

                var chunks = [];
                res.on('data', function(chunk) { chunks.push(chunk); });

                res.on('end', function () {
                    var oembed = JSON.parse(Buffer.concat(chunks));
                    cb(null, {
                        title: oembed.title,
                        instagram_oembed: oembed
                    });
                });

            }).on('error', function(e) {
                cb("Got error: " + e.message);
            });
    },

    getLink: function(instagram_oembed) {

        return {
            type: CONFIG.T.text_html,
            html: instagram_oembed.html,
            rel: [CONFIG.R.oembed, CONFIG.R.app, CONFIG.R.inline, CONFIG.R.ssl]
        };
    },

    tests: [{
        page: "http://blog.instagram.com/",
        selector: ".photogrid a"
    },
        "http://instagram.com/p/HbBy-ExIyF/",
        "http://instagram.com/p/a_v1-9gTHx/",
        {
            skipMixins: [
                "oembed-title"
            ]
        }
    ]
};