var mongoose = require('mongoose'), Schema = mongoose.Schema;

var autoIncrementSchema = new Schema({
    _id: String,
    seq: {type: Number, default: 0}
});

var AutoIncrement = mongoose.model('AutoIncrement', autoIncrementSchema);
module.exports = AutoIncrement;