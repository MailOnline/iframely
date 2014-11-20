module.exports = {

    re: /^https?:\/\/([a-zA-Z0-9]+).wistia\.com\/medias\/([_a-zA-Z0-9]+)/i,

    mixins: [
        "oembed-site",
        "oembed-title",
        "oembed-thumbnail",
        "oembed-duration"
    ],

    getLinks: function(oembed, urlMatch) {

        return [{
            href: "//fast.wistia.net/embed/iframe/" + urlMatch[2],
            type: CONFIG.T.text_html,
            rel: [CONFIG.R.player, CONFIG.R.html5],
            "aspect-ratio": oembed.width / oembed.height
        }, {
            href: "//fast.wistia.net/embed/iframe/" + urlMatch[2] + "?autoPlay=true",
            type: CONFIG.T.text_html,
            rel: [CONFIG.R.player, CONFIG.R.html5, CONFIG.R.autoplay],
            "aspect-ratio": oembed.width / oembed.height
        }, {
            href: "http://wistia.com/favicon.ico",
            type: CONFIG.T.image,
            rel: CONFIG.R.icon
        }];
    },


    tests: [
        "http://appsumo.wistia.com/medias/fudkgyoejs",
        "http://convinceandconvert.wistia.com/medias/52lpg5691w?utm_campaign=Argyle+Social-2013-04&utm_medium=Argyle+Social&utm_source=General+Use&utm_term=2013-04-24-13-23-55",
        "http://eleiapure.wistia.com/medias/o3z58wpwaj",
        "http://mcgallen.wistia.com/medias/3nd1iitk2s?embedType=seo"
    ]
};