module.exports = {

    getLinks: function(twitter, meta, whitelistRecord) {

        if (!twitter.image && !twitter.card == "photo")
            return;

        var rel = [CONFIG.R.twitter];
        var links = [];


        if (whitelistRecord && twitter.card == "photo" && whitelistRecord.isAllowed && whitelistRecord.isAllowed('twitter.photo')) {
            rel.push(CONFIG.R.image);

            if (twitter.image && (twitter.image.url || twitter.image.src || (typeof twitter.image === 'string'))) {

                links.push({
                    href: twitter.image.url || twitter.image.src || twitter.image,
                    type: CONFIG.T.image,
                    rel: rel,
                    width: twitter.image.width,
                    height: twitter.image.height
                });

            } else if (meta.og.image) { //falback to og

                links.push({
                    href: meta.og.image.url || ((meta.og.image instanceof Array) ? meta.og.image[0] : meta.og.image),
                    type: meta.og.image.type || CONFIG.T.image,
                    rel: rel,
                    width: meta.og.image.width,
                    height: meta.og.image.height
                });

            }

        } else if (twitter.image) {

            rel.push(CONFIG.R.thumbnail);

            links.push({
                href: twitter.image.url || twitter.image.src || twitter.image,
                type: CONFIG.T.image,
                rel: rel,
                width: twitter.image.width,
                height: twitter.image.height
            });            
        }


        if (twitter.card == "gallery") {
            var i; // JSLint :\\

            for (i=3; i>=0; i--) {
                if (twitter['image'+i]) {
                    links.push({
                        href: twitter['image'+i].src || twitter['image'+i],
                        type: CONFIG.T.image,
                        rel: [CONFIG.R.thumbnail, CONFIG.R.twitter]
                    });
                }
            }
        }

        return links;
    }
};