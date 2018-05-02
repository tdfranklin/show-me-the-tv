const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const commonModule = {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            },
        },
    ],
};

module.exports = [
    {
        entry: path.resolve(__dirname, 'src', 'index.js'),
        output: {
            path: path.resolve(__dirname, 'public'),
            filename: 'app_bundle.js',
        },
        module: commonModule,
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html'
            })
        ],
        devServer: {
            contentBase: path.join(__dirname, '/public'),
            watchContentBase: true,
            proxy: [
                {
                    context: ['/api'],
                    target: 'http://localhost:3000',
                    secure: false,
                },
            ],
        }
    },
    {
        entry: path.resolve(__dirname, 'server', 'server.js'),
        output: {
            path: path.resolve(__dirname, 'public'),
            filename: 'server_bundle.js',
        },
        module: commonModule,
        target: 'node',
        externals: [nodeExternals()],
    },
];

// const frontend = {
//     entry: './src/index.js',
//     output: {
//         path: path.join(__dirname, '/public'),
//         filename: 'app_bundle.js'
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: './src/index.html'
//         })
//     ]
// };

// const backend = {
//     entry: './server/server.js',
//     output: {
//         path: path.join(__dirname, '/public'),
//         filename: 'server_bundle.js'
//     }
// };

// module.exports = [
//     Object.assign({}, common, frontend),
//     Object.assign({}, common, backend)
// ];

// module.exports = {
//     entry: './src/index.js',
//     output: {
//         path: path.join(__dirname, '/public'),
//         filename: 'app_bundle.js'
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 use: {
//                     loader: 'babel-loader'
//                 }
//             }
//         ]
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: './src/index.html'
//         })
//     ]
// }