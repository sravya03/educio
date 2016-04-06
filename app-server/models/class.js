var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var classSchema = Schema({
	
	name: String,

	teacher: { type: ObjectId, ref: 'Teacher' },
	
	roster: [{ type: ObjectId, ref: 'Student' }],
	
	assignments: [{ type: ObjectId, ref: 'Assignment' }],
	
	classTimes: [{
		day_of_week: String,
		start_hour: Integer,
		start_min: Integer,
		end_hour: Integer,
		end_min: Integer
	}],
	
	start_date: Date,
	
	end_date: Date,
	
	holidays: [{ type: Date }]
});

module.exports = mongoose.model('Class', classSchema);
