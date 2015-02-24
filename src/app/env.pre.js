/* unused: false*/
/* exported FB_API_KEY */
// jshint ignore:start
var missingAPIKey = 'Your app id was unset. Ensure gulp/env.json, gulp/myEnv.js, env.pre.js all agree';
var missingILCServer = 'The ILC Server was unset. Please ensure your environment is setup correctly.';
var FB_API_KEY = '/* @echo FB_API_KEY */' || missingAPIKey;
var ILC_SERVER = '/* @echo ILC_SERVER */' || missingILCServer;
// jshint ignore:end
