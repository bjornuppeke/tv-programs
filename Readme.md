## TV Programs
  A web app for creating, reading and deleting TV programs from a database.

## Built using
  * [node.js](http://nodejs.org)
  * [mongodb](http://www.mongodb.org/) document database, because it's fast and pretty awesome.
  * [mongoose](http://mongoosejs.com/) ODM for mongodb, because it just makes life easier.
  * [express](http://expressjs.com/) node web framework, because is looked cool.
  * [jade](http://jade-lang.com) for templating, because it goes really well with express.
  * [twitter bootstrap](http://getbootstrap.com/2.3.2/) for client interfaces, because sometimes there's just no time for custom interface design.

## To run
  Install the dependencies.

    $ npm install

  Start mongodb (in a new shell).

    $ mongod

  Run the app.

    $ node index.js

  Point your browser to localhost:3000.

## RESTful
  Programs are created, read and deleted in a RESTful manner

  index

    GET /programs

  index.json

    GET /programs.json

  show

  	GET /programs/:id

  create

  	POST /programs/create

  delete

    DELETE /programs/:id

## Database
  The Mongoose schema for a Program:

```javascript
var programSchema = new Schema({
	"name": {type: String, default: ''},
	"url": {type: String, default: ''},
	"leadtext": {type: String, default: ''},
	"b-line": {type: String, default: ''},
	"synopsis": {type: String, default: ''},
	"start_time": {type: Date, default: new Date("2014-01-01T12:00:00Z")}
});
```

## Design pattern
	I've tried to maintain a somewhat MVC pattern

		project
			|
			+--	models
			|		|
			|		+--	program.js
			|
			+--	views
			|		|
			|		+--	program
			|				|
			|				+--	index.jade
			|				+--	show.jade
			|				+--	create.jade
			|	
			+--	controllers
					|
					+-- program.js