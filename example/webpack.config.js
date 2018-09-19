const {resolve} = require('path')

module.exports = {
    context: __dirname,
    devServer: {
        contentBase: __dirname
    },
    devtool: 'cheap-module-source-map',
    entry: {
        form: './main'
    },
    output: {
        filename: '[name].entry.js'
    },
    resolve: {
        alias: {
            // Use un-compiled version
            // 'react-schema-form': '../src',
            // Use compiled version
            'react-schema-form': '../dist/react-schema-form.min.js',
            'react': resolve('./node_modules/react'),
            'react-dom': resolve('./node_modules/react-dom')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [{
                    loader: 'babel-loader'
                }],
                exclude: /node_modules/
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/, use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 100000
                    }
                }]
            }
        ]
    }
}
