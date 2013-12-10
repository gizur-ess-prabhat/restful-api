
//------------------------------
//
// 2013-12-10, Prabhat Khera <prabhat.khera@gmail.com>
//
// Copyright Prabhat Khera
//
// Install with dependencies: npm install 
//
// Documentation is 'docco style' - http://jashkenas.github.com/docco/
//
// Using Google JavaScript Style Guide - http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
//
//------------------------------


(function() {
    // Global Config object
    // with browser window or with node module
    var Config = (typeof window === 'undefined') ? exports.Config = {} : window.Config = {};
    var DATABASE_URL = Config.DATABASE_URL = 'mongodb://localhost/restapi';
    
    var mongoose = require('mongoose');
    mongoose.connect(DATABASE_URL);
    /**
     * Error code AND Response Code
     */
    var ERRCODE = Config.ERRCODE = {
        'E1001': 401, // HEADERS MISSING
        'E1002': 401, // INVALID API KEY
        'E1003': 401, // INVALID USERNAME / PASSWORD
        'E1004' : 204, // Problem Retriving Data
        'E1005' : 204, // Problem Saving Data
        'E1006' : 400, // Required Fields Missing
    };

    var error = Config.error = function(status, msg) {
        var err = new Error(msg);
        err.status = status;
        return err;
    };

    var response = Config.response = function(res, json) {
        res.statusCode = 201;
        res.send(json);
        return res;
    };
})();
