const ROOT = __dirname;

module.exports = {

    // Chosen mode tells webpack to use its built-in optimizations accordingly.
    mode: "development",

    // webpack folder’s entry js — excluded from jekll’s build process.
    entry: "./webpack/entry.jsx",

    output: {
        // we’re going to put the generated file in the assets folder so jekyll will grab it.
        path: `${ROOT}/src/assets/javascripts/`,
        filename: "bundle.js"
    },

    watch: true, // boolean
    // enables watching

    watchOptions: {
        aggregateTimeout: 1000, // in ms
        // aggregates multiple changes to a single rebuild
        poll: true,
        poll: 500, // intervall in ms
        // enables polling mode for watching
        // must be used on filesystems that doesn't notify on change
        // i. e. nfs shares
    },

    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            loader: "babel-loader", // "babel-loader" is also a legal name to reference
            query: {
                presets: ["react", "es2015"]
            },
            resolve: {
                extensions: ['.js', '.jsx']
            }
        }]
    },

    devServer: {
        contentBase: path.join(__dirname, '_site'),
        port: 9000
    }
};
