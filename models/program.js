var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var programSchema = new Schema({
	"name": {type: String, default: ''},
	"url": {type: String, default: ''},
	"leadtext": {type: String, default: ''},
	"b-line": {type: String, default: ''},
	"synopsis": {type: String, default: ''},
  "start_time": {type: Date, default: new Date("2014-01-01T12:00:00Z")}
});
 
module.exports = mongoose.model('Program', programSchema);
    

