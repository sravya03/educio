var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var lectureSchema = Schema({

	date: Date,

	attendance: [{ type: ObjectId, ref: 'Student' }],

	agenda: [{ type: ObjectId, ref: 'AgendaItem' }]
});

module.exports = mongoose.model('Lecture', lectureSchema);
