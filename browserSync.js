var browserSync = require('browser-sync');
const ROOT = __dirname;
/**
 * Run Browsersync with server config
 */
browserSync({
    server: ROOT + "/_site",
    watchOptions: {
        ignoreInitial: true,
    },
    awaitWriteFinish: {
        stabilityThreshold: 3000,
        pollInterval: 100
    },
    files: [ ROOT + "/_site/assets/main.css", ROOT + "/_site/assets/javascripts/*.js"],
    port: 8080
});
