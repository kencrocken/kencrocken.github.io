var browserSync = require('browser-sync');
const ROOT = __dirname;
/**
 * Run Browsersync with server config
 */
browserSync({
    server: ROOT + "/_site",
    files: [ ROOT + "/_site",],
    port: 8080
});
