
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


var mongoose = require('mongoose'), Schema = mongoose.Schema;

var apiKeySchema = new Schema({
    _id: Number,
    public_key: String,
    private_key: String,
    company_id: { type: Number, ref: 'Company' },
    created: {type: Date, default: Date.now},
    modified: {type: Date, default: Date.now},
    active: {type: Boolean, default: true}
});

var ApiKey = mongoose.model('ApiKey', apiKeySchema);
module.exports = ApiKey;
