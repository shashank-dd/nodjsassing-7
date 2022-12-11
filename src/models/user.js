
const mongo = require('mongoose');
const Schema = mongo.Schema;
const ObjectId = Schema.ObjectId;
const blogSchema = new mongo.Schema({
    _id: {type:Number,required:true,unique:true},
    name: {type:String,required:true},
    currentClass: {type:Number,required:true},
    division: {type:String,required:true}
})

const stud = mongo.model('student', blogSchema);

module.exports = stud;
