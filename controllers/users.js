
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


var mongoose = require('mongoose');
var config = require('../config/config.js').Config;

module.exports.controller = function(app) {
    
    /**
     * GEt all users
     */ 
    app.get('/api/users', function(req, res, next) {
        // Find all Users
        mongoose.models.User.find(function(err, users) {
            if (err instanceof Error) {
                return next(config.error(config.ERRCODE[err.message], err.message));
            } else {
                if (users) { // 
                    return res.send(users);
                } else { // not found
                    return next(config.error(config.ERRCODE.E1004, 'E1004'));
                }
            }
        });
    });
    
    /**
     * GEt User by Id
     */ 
    app.get('/api/users/:id', function(req, res, next) {        
        // If missing required fields
        if (!req.params.id) {
            return next(config.error(config.ERRCODE.E1006, 'E1006'));
        }
        
        // Find User
        mongoose.models.User.findOne({'_id': req.params.id}, function(err, user) {
            if (err instanceof Error) {
                return next(config.error(config.ERRCODE[err.message], err.message));
            } else {
                if (user) { // 
                    return res.send(user);
                } else { // not found
                    return next(config.error(config.ERRCODE.E1004, 'E1004'));
                }
            }
        });
    });	
    
    /**
     * Create user
     */ 
    app.post('/api/users/create', function(req, res, next) {
        // If Request Body is empty
        if (!req.body) {
            return next(config.error(config.ERRCODE.E1003, 'E1003'));
        }

        // If missing required fields
        if (!req.body.first_name || !req.body.last_name) {
            return next(config.error(config.ERRCODE.E1006, 'E1006'));
        }
        
        var instance = new mongoose.models.User(req.body);
        
        var callback = function(error) {
            if (error) {
                return next(config.error(config.ERRCODE['E1003'], "E1003"));
            } else {
                return res.send({'success': true});
            }
        };

        instance.save(callback);
    });
    
    /**
     * Update User
     */ 
    app.put('/api/users/update', function(req, res, next) {
        // If Request Body is empty
        if (!req.body) {
            return next(config.error(config.ERRCODE.E1003, 'E1003'));
        }

        // If missing required fields
        if (!req.body._id || !req.body.first_name || !req.body.last_name) {
            return next(config.error(config.ERRCODE.E1006, 'E1006'));
        }
        
        var callback = function(error, doc) {
            if (error) {
                console.log(error);
                return next(config.error(config.ERRCODE['E1003'], "E1003"));
            } else {
                
                for(var i in req.body){
                    if (req.body.hasOwnProperty(i))
                        doc[i] = req.body[i];
                }
                
                doc.save();
                return res.send({'success': true});
            }
        };
        mongoose.models.User.findOne({'_id': req.body._id}, callback);
    });
    
    /**
     * Delete User
     */ 
    app.delete('/api/users/:id', function(req, res, next) {
        // If missing required fields
        if (!req.params.id) {
            return next(config.error(config.ERRCODE.E1006, 'E1006'));
        }
        
        var callback = function(error, user) {
            if (error) {
                console.log(error);
                return next(config.error(config.ERRCODE['E1003'], "E1003"));
            } else {
                return user.remove(function(err){
                    if(err)
                        return next(config.error(config.ERRCODE['E1003'], "E1003"));
                    else
                        return res.send({'success': true});
                });
            }
        };
        mongoose.models.User.findOne({'_id': req.params.id}, callback);
    });
};
