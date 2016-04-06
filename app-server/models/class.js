var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ClassSchema = Schema({
	
	name: String,

	teacher: { type: ObjectId, ref: 'Teacher' },
	
	roster: [{ type: ObjectId, ref: 'Student' }],
	
	assignments: [{ type: ObjectId, ref: 'Assignment' }],
	
	classTimes: [{
		day_of_week: String,
		start_hour: Number,
		start_min: Number,
		end_hour: Number,
		end_min: Number
	}],
	
	start_date: Date,
	
	end_date: Date,
	
	holidays: [{ type: Date }]
});

module.exports = mongoose.model('Class', ClassSchema);
