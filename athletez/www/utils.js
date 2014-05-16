// utils.js  
// --------  
// utilities / libraries,  
// Requires `define`  
// See http://requirejs.org/docs/api.html#define

define(function (require) {

    return {
        "ajaxOptions": require("utils/ajax-options"),
        "debug": require("utils/debug"),
        "docCookies": require("utils/cookies"),
        "lib": require("utils/lib"),
        "storage": require("utils/storage")
    };
    // the shims should only extend native JavaScript Objects when needed, e.g. Object.create
});
