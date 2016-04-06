var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var studentSchema = Schema({

	first_name: String,

	last_name: String
});

module.exports = mongoose.model('Student', studentSchema);
