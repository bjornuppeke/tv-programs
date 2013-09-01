## TV Programs
  A web app for creating, reading and deleting TV programs from a database.

## Built using:
  * [node.js](http://nodejs.org)
  * [mongodb](http://www.mongodb.org/) document database.
  * [mongoose](http://mongoosejs.com/) ODM for mongodb.
  * [express.js](http://expressjs.com/) node framework.
  * [jade](http://jade-lang.com) for templating.
  * [Twitter Bootstrap](http://getbootstrap.com/2.3.2/) for client interfaces.
  

## To run:
  Install the dependencies.

    $ npm install

  Start mongodb (in a seperate shell window/tab).

    $ mongod

  Run the app.

    $ node index.js

  Point your browser to localhost:3000.

## RESTful
  Programs are created, read and deleted in a RESTful manner

  index

    GET /programs

  show

  	GET /programs/:id

  create

  	POST /programs/create

  delete

    DELETE /programs/:id