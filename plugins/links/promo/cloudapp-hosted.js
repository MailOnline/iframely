module.exports = {

    getLink: function(twitter) {

        if (twitter.card === "photo" && twitter.site === '@cloudapp' 
            && twitter.image && /^https?:\/\/f\.cl\.ly\//.test(twitter.image.url || twitter.image.src || twitter.image))  {

            return {
                href: twitter.image.url || twitter.image.src || twitter.image,
                type: CONFIG.T.image,
                rel: CONFIG.R.image
            };
        }

    }
};