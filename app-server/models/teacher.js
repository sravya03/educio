var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var TeacherSchema = Schema({

    // for local credentials other methods can be added
    // i.e Facebook login
    local            : {
        email        : String,
        password     : String,
    },

    first_name: String,

    last_name: String,
    
    classes: [{ type: ObjectId, ref: 'Class' }]
});

// generating a hash
TeacherSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
TeacherSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('Teacher', TeacherSchema);
