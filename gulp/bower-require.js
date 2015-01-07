var gulp = require('gulp');

var bowerRequireJS = require('bower-requirejs');

gulp.task('bower', function() {
    var options = {
        baseUrl: 'src',
        config: 'src/app/require.config.js',
        transitive: true
    };

    bowerRequireJS(options, function (rjsConfigFromBower) {
        console.log("Updated src/app/require.config.js !");
    });
});