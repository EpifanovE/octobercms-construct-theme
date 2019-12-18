var path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    entry: path.resolve(__dirname, '../resources/js/scripts.js'),
    output: {
        path: path.resolve(__dirname, '../assets/js'),
        publicPath: '/assets/js/',
        filename: 'scripts.min.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'css-loader'
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                // include: [
                //     path.resolve(__dirname, '../src'),
                //     path.resolve(__dirname, '../node_modules/foundation-sites'),
                //     path.resolve(__dirname, '../node_modules/lazyload'),
                // ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    watchOptions: {
        poll: false,
        aggregateTimeout: 100
    },
    // resolve: {
    //     alias: {
    //         '@': resolve('../src')
    //     },
    //     extensions: ['*', '.js', '.vue', '.json']
    // },
    performance: {
        hints: false
    },
    externals: {
        $: 'jQuery',
        jQuery: 'jQuery',
    }
};