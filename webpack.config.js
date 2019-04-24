const merge = require('webpack-merge');
const HappyPack = require('happypack');
const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const parts = require('./webpack.parts');

const PATHS = {
    app: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist'),
    build: path.join(__dirname, 'build'),
};

const commonConfig = merge([
    {
        entry: {
            babel: '@babel/polyfill',
        },
        resolve: {
            alias: {
                images: path.join(PATHS.app, 'assets', 'images'),
                fonts: path.join(PATHS.app, 'assets', 'fonts'),
            },
        },
        plugins: [
            new HappyPack({
                loaders: [
                    // Capture Babel loader
                    'babel-loader',
                ],
            }),
            new webpack.ContextReplacementPlugin(
                /moment[/\\]locale$/,
                /ru|uk|en/
            ),
            // new BundleAnalyzerPlugin(),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                slick: 'slick-carousel',
            }),
            new CopyPlugin([
                {
                    from: './src/assets/fonts',
                    to: './fonts',
                },
                {
                    from: './src/assets/favicon',
                    to: './favicon',
                },
                {
                    from: './src/assets/images',
                    to: './images',
                },
                {
                    from: './src/assets/uploads',
                    to: './uploads',
                },
            ]),
        ],
    },
    parts.loadJavaScript({ include: PATHS.app }),
]);

const productionConfig = merge([
    {
        output: {
            chunkFilename: '[name].[chunkhash:4].js',
            filename: '[name].[chunkhash:4].js',
            publicPath: '/',
            path: PATHS.build,
        },
        stats: {
            // One of the two if I remember right
            // entrypoints: false,
            children: false,
        },
    },
    parts.clean(['build']),
    parts.extractCSS({
        use: [
            'css-loader?sourceMap',
            parts.autoprefix(),
            // parts.discardDuplicates(),
            'resolve-url-loader?sourceMap',
            'sass-loader?sourceMap',
        ],
    }),
    parts.loadFonts({
        options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
        },
    }),
    // parts.purifyCSS({
    //   paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true })
    // }),
    parts.loadImages({
        options: {
            limit: 15000,
            name: '[name].[hash:4].[ext]',
            outputPath: 'images/',
        },
    }),
    parts.generateSourceMaps({ type: 'cheap-module-source-map' }),
    {
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'initial',
                    },
                },
            },
            runtimeChunk: {
                name: 'manifest',
            },
        },
    },
    {
        recordsPath: path.join(__dirname, 'records.json'),
    },
    {
        performance: {
            hints: 'warning',
            maxEntrypointSize: 50000,
            maxAssetSize: 450000,
        },
    },
    parts.minifyJavaScriptUglify(),
    parts.minifyCSS({
        options: {
            discardComments: {
                removeAll: true,
            },
            // Run cssnano in safe mode to avoid
            // potentially unsafe transformations.
            safe: true,
        },
    }),
]);

const developmentConfig = merge([
    {
        output: {
            publicPath: '/',
            path: PATHS.dist,
        },
    },
    parts.clean(['dist']),
    parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT,
    }),
    parts.loadSASS(),
    parts.loadImages(),
    parts.loadFonts(),
]);

module.exports = (mode) => {
    process.env.BABEL_ENV = mode;

    const pages = [
        parts.page({
            title: 'Main',
            template: path.join(PATHS.app, 'html/views/index.html'),
            entry: {
                main: path.join(PATHS.app, 'js/views/index.js'),
            },
            chunks: ['babel', 'main', 'manifest', 'vendors'],
        }),
        parts.page({
            title: 'Listing',
            template: path.join(PATHS.app, 'html/views/listing/index.html'),
            path: 'listing',
            entry: {
                listing: path.join(PATHS.app, 'js/views/listing/index.js'),
            },
            chunks: ['babel', 'listing', 'manifest', 'vendors'],
        }),
        parts.page({
            title: 'Buyer',
            template: path.join(PATHS.app, 'html/views/buyer/index.html'),
            path: 'buyer',
            entry: {
                buyer: path.join(PATHS.app, 'js/views/buyer/index.js'),
            },
            chunks: ['babel', 'buyer', 'manifest', 'vendors'],
        }),
        parts.page({
            title: 'Buyer-land',
            template: path.join(PATHS.app, 'html/views/land/index.html'),
            path: 'land',
            entry: {
                land: path.join(PATHS.app, 'js/views/land/index.js'),
            },
            chunks: ['babel', 'land', 'manifest', 'vendors'],
        }),
    ];

    const config = mode === 'production' ? productionConfig : developmentConfig;

    return merge([commonConfig, config, { mode }].concat(pages));
};
