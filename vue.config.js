module.exports = {
    publicPath: '',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://1.15.112.44:18080',  // 真实请求URl
                changeOrigin: true,
                pathRewrite: {
                    '/api': ''
                }
            }
        }
    }
};