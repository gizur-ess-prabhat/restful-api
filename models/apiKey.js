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