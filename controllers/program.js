var Program = require('../models/program.js');

var dateFormat = require ('../libs/date.format.js').dateFormat;
var dateMask = 'dddd, mmmm dS, yyyy, h:MM TT';
// dateFormat(Date, mask, utc);

exports.index = function(req, res) {
  Program.find(function(err, programs) {
    if (err) return res.send(err);

    for (var i in programs) {
      programs[i].human_start_time = dateFormat(new Date(programs[i].start_time), dateMask);
    }

    res.render('program/index', {programs: programs});
  });
}

exports.list = function(req, res) {
  Program.find()
    .select("-_id -__v")
    .exec(function(err, programs) {
      res.send(programs);
  });
}

exports.create = function(req,res) {
  res.render('program/create');
}

exports.store = function(req, res) {
  new Program({
    "name": req.body.name,
    "url": req.body.url,
    "leadtext": req.body.leadtext,
    "b-line": req.body["b-line"],
    "synopsis": req.body.synopsis,
    "start_time": new Date().toISOString()

  }).save(function (err, program) {
    if (err) return res.send(err);

    console.log('Successfully saved "' + program.name + '"');
    res.render('program/create', {success: 'Successfully saved "' + program.name + '"'});
  });
}

exports.show = function(req, res) {
  Program.findOne({"url": req.params.url}, function(err, program) {
    if (err) return res.render('404');
    if (!program) return res.render('404');
    program.human_start_time = dateFormat(new Date(program.start_time), dateMask);
    res.render('program/show', {program: program});
  });
}

exports.delete = function(req, res) {
  Program.findById(req.params.id, function(err, program) {

    program.remove(function (err) {
      if (err) return res.send(err);

      Program.findById(program._id, function (err, program) {
        console.log(program) // null
        res.redirect('/programs');
      });
    });
  });  
}