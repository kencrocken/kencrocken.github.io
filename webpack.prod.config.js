const ROOT = __dirname;

module.exports = {

    // Chosen mode tells webpack to use its built-in optimizations accordingly.
    mode: "production",

    // webpack folder’s entry js — excluded from jekll’s build process.
    entry: "./webpack/entry.jsx",

    output: {
        // we’re going to put the generated file in the assets folder so jekyll will grab it.
        path: `${ROOT}/src/assets/javascripts/`,
        filename: "bundle.js"
    },

    watch: false, // boolean
    // enables watching

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
    }
};
