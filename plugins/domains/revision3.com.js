var jquery = require('jquery');

module.exports = {

    mixins: [
        "oembed-title",
        "oembed-author",
        "oembed-site",

        "canonical",
        "og-description",
        "og-image",
        "favicon"
    ],

    getLink: function(oembed) {

        var $container = jquery('<div>');
        try{
            $container.html(oembed.html5 || oembed.html);
        } catch(ex) {}

        var $iframe = $container.find('iframe');

        if ($iframe.length == 1) {
            return {
                href: $iframe.attr('src').replace(/(&width=[\d]+|&height=[\d]+)/g, "").replace("http:", ""),
                type: CONFIG.T.text_html,
                rel: [CONFIG.R.player, CONFIG.R.html5],
                "aspect-ratio": oembed.width / oembed.height
            }
        }
    },

    tests: [{
        pageWithFeed: "http://revision3.com/osalt"
    },
        "http://revision3.com/osalt/htpc-software"
    ]
};