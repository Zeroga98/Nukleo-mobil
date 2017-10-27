var path = require('path');
var useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

module.exports = function () {
    useDefaultConfig.resolve.alias = {
        "@app/config": path.resolve('./src/environments/' + process.env.IONIC_ENV + '.ts')
    };

    return useDefaultConfig;
}