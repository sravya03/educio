var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var assignmentSchema = Schema({
	
	name: String,
	
	posted_date: Date,

	due_date: Date,

	total_score: Number,

	student_grades: [{ student_id: ObjectId, grade: Number }]
});

module.exports = mongoose.model('Assignment', assignmentSchema);
