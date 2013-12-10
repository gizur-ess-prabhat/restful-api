
//------------------------------
//
// 2013-12-10, Prabhat Khera
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

var autoIncrementSchema = new Schema({
    _id: String,
    seq: {type: Number, default: 0}
});

var AutoIncrement = mongoose.model('AutoIncrement', autoIncrementSchema);
module.exports = AutoIncrement;
