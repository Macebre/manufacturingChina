const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

exports.devServer = ({ host, port } = {}) => ({
    devServer: {
        historyApiFallback: true,
        stats: 'errors-only',
        host, // Defaults to `localhost`
        port, // Defaults to 8080
        // open: true,
        overlay: true,
        hot: true,
        open: true,
        inline: true,
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
});

exports.loadCSS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                include,
                exclude,
                use: [
                    { loader: 'style-loader', options: { sourceMap: true } },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: true,
                        },
                    },
                ],
            },
        ],
    },
});

exports.loadLESS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.less$/,
                include,
                exclude,
                use: ['style-loader?sourceMa', 'css-loader', 'less-loader'],
            },
        ],
    },
});

exports.loadSASS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                include,
                exclude,
                use: [
                    'style-loader?sourceMap',
                    'css-loader?sourceMap',
                    'resolve-url-loader?sourceMap',
                    'sass-loader?sourceMap',
                ],
            },
        ],
    },
});

exports.loadSTYL = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.styl$/,
                include,
                exclude,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'stylus-loader',
                        options: {
                            use: [require('yeticss')],
                        },
                    },
                ],
            },
        ],
    },
});

exports.extractCSS = ({ include, exclude, use = [] }) => {
    const plugin = new MiniCssExtractPlugin({
        filename: '[name].[contenthash:4].css',
        chunkFilename: '[id].[contenthash:4].css',
    });

    return {
        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/,
                    include,
                    exclude,
                    use: [MiniCssExtractPlugin.loader].concat(use),
                },
            ],
        },
        plugins: [plugin],
    };
};

exports.purifyCSS = ({ paths }) => ({
    plugins: [new PurifyCSSPlugin({ paths })],
});

exports.autoprefix = () => ({
    loader: 'postcss-loader',
    options: {
        plugins: () => [require('autoprefixer')()],
    },
});
exports.discardDuplicates = () => ({
    loader: 'postcss-loader',
    options: {
        plugins: () => [require('postcss-discard-duplicates')()],
    },
});

exports.loadImages = ({ options } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{ loader: 'file-loader', options }],
            },
        ],
    },
});

exports.loadSVG = ({ options } = {}) => ({
    module: {
        rules: [
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader',
            },
        ],
    },
});

exports.loadFonts = ({ options } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: [{ loader: 'file-loader', options }],
            },
        ],
    },
});

exports.loadHTML = ({ options } = {}) => ({
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
        ],
    },
});

exports.loadJavaScript = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include,
                exclude,
                resolve: {
                    extensions: ['.js', '.jsx'],
                },
                loader: 'happypack/loader',
            },
        ],
    },
});

exports.generateSourceMaps = ({ type }) => ({
    devtool: type,
});

exports.clean = (pathes) => ({
    plugins: [new CleanWebpackPlugin(pathes)],
});

exports.minifyJavaScriptUglify = () => ({
    optimization: {
        minimizer: [
            new UglifyWebpackPlugin({
                sourceMap: true,
                parallel: true,
                uglifyOptions: {
                    compress: {
                        drop_console: true,
                        // unsafe: true,
                    },
                    output: {
                        beautify: false,
                    },
                },
            }),
        ],
    },
});

exports.minifyCSS = ({ options }) => ({
    plugins: [
        new OptimizeCSSAssetsPlugin({
            cssProcessor: cssnano,
            cssProcessorOptions: options,
            canPrint: false,
        }),
    ],
});

exports.page = ({
    path = '',
    template = require.resolve('html-webpack-plugin/default_index.ejs'),
    title,
    entry,
    output,
    chunks,
} = {}) => ({
    output,
    entry,
    plugins: [
        new HtmlWebpackPlugin({
            filename: `${path && `${path}/`}index.html`,
            title,
            template,
            chunks,
            alwaysWriteToDisk: true,
        }),
    ],
});
