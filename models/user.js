var mongoose = require('mongoose'), Schema = mongoose.Schema;

var userSchema = new Schema({
    company: String,
    first_name: String,
    last_name: String,
    address1: String,
    address2: String,
    address3: String,
    city: String,
    state: String,
    country: String,
    zipcode: String,
    email: String,
    username: String,
    password: String,
    gender: String,
    dateofbirth: Date,
    designation: String,
    created: {type: Date, default: Date.now},
    modified: {type: Date, default: Date.now},
    active: {type: Boolean, default: true}
});

userSchema.virtual('name').get(function() {
    return this.first_name + ' ' + this.last_name;
});

userSchema.pre('save', function(next) {
    var that = this;
    mongoose.models.AutoIncrement.findByIdAndUpdate("user_id", { $inc: { next: 1 } }, {new: true, upsert: true, select: {next: 1}}, function(err, data) {
        if (!err && data)
            that._id = data.seq + 1;
        next();
    });
});

var User = mongoose.model('User', userSchema);
module.exports = User;
