module.exports = {

    re: [
        /https?:\/\/(?:giant|thumbs)\.gfycat\.com\/([a-zA-Z0-9]+)(?:\-mobile)?\.(?:webm|mp4|gif)$/i,
        /https?:\/\/gfycat\.com\/detail\/([a-zA-Z0-9]+)$/i        
    ],

    getLink: function(urlMatch, cb) {

        cb ({
            redirect: "https://gfycat.com/" + urlMatch[1]
        });
    },

    tests: [{
        noFeeds: true,
        skipMethods: ["getLink"]
    },
        "https://giant.gfycat.com/ObviousEuphoricHadrosaurus.webm",
        "https://thumbs.gfycat.com/ObviousEuphoricHadrosaurus-mobile.mp4",
        "https://gfycat.com/detail/ImmaculateWastefulCanine"
    ]
};