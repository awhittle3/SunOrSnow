const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const browserPlugin = require('webpack-browser-plugin');
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});
    
module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

            // { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },

            {
                test: /\.css$/,
                use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader']
            },

            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader'],
            // },
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        // "react": "React",
        // "react-dom": "ReactDOM"
    },
    plugins: [
        htmlPlugin,
        new MiniCssExtractPlugin({ filename: '[name].css' }),
        // new browserPlugin({
        //     browser: 'Firefox',
        //     port: 1337,
        //             // openOptions: {app: ['Chrome', '--incognito']
        //                 // '--incognito',
        //                 // '--disable-web-security', // to enable CORS
        //                 // '--user-data-dir=' + path.resolve("./data") // to let Chrome create and store here developers plugins, settings, etc.

        //             // },
                
            
        // })
    ]
};