const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#000000',
                            '@menu-item-active-bg': 'rgba(0,0,0,0.4)',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
