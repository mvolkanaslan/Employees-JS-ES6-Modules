const path = require('path');

module.exports = {
    entry : ["./src/js/app.js"],
    output:{
        path: path.join(__dirname,"dist"),
        filename:'js/bundle.js',
    },
    module:{
        rules:[
            //this rule for only javascript packaging
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use:{
                    // No more settings, this will reference .babelrc
                    loader:"babel-loader"
                }
            },
            //this rule for css packaging
            {
                test: /\.css$/i,
                use:["style-loader","css-loader"]
            }
        ]
    },
    target: "browserslist", // this will referance .broeserlistrc
    devServer:{
        static: {
            directory: path.join(__dirname,'./dist'),
        },
    },

}
