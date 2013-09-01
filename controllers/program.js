var Program = require('../models/program.js');
var dateFormat = require ('../libs/date.format.js').dateFormat;
var dateMask = 'dddd, mmmm dS, yyyy, h:MM TT';

// Db Seeding
Program.count(function(err, count) {
  if (count === 0) {
    console.log('There are no programs in the database. Let\'s go ahead and create some!');
    seedDb();
  }
});

exports.index = function(req, res) {
  // Pagination
  var pageSize = 10
    , page = parseInt(req.query.page) || 1;

  Program.find()
  .skip(pageSize * (page - 1))
  .limit(pageSize)
  .exec(function(err, programs) {
    if (err) return res.render('500');

    for (var i in programs) {
      programs[i].human_start_time = dateFormat(new Date(programs[i].start_time), dateMask);
    }

    res.render('program/index', {
      programs: programs,
      nextPage: page + 1,
      prevPage: page - 1,
      isNext: programs.length >= pageSize,
      isPrev: page > 1
    });
  });
}

exports.list = function(req, res) {
  Program.find()
    .select("-_id -__v")
    .exec(function(err, programs) {
      var host = "http://www.domain.tld/"
        , jsonPrograms = [];
      for (var i in programs) {
        jsonPrograms.push({
          "leadtext": programs[i].leadtext,
          "name": programs[i].name,
          "b-line": programs[i]["b-line"],
          "synopsis": programs[i].synopsis,
          "url": host + programs[i].url,
          "start_time": new Date(programs[i].start_time).toISOString()
        })
      }

      res.json({programs: jsonPrograms});
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
    "start_time": new Date(req.body.start_time).toISOString()

  }).save(function (err, program) {
    if (err) return res.render('500');
    res.render('program/create', {success: 'Successfully saved "' + program.name + '"'});
  });
}

exports.show = function(req, res) {
  var url = req.params.url
    , reg = /^[\d\-a-z]+$/;

  if (!reg.test(url)) {
    // Don't even try to find it
    return res.render('404');
  }

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
        if (!program) {
          res.redirect('/programs');  
        }
      });
    });
  });  
}

function seedDb() {
  var programs = []
    , titles = [
    "Lost", 
    "The Americans", 
    "Anger Management", 
    "How I met Your Mother", 
    "Bamse", 
    "Trollz", 
    "Family Guy", 
    "Stalkers",
    "Project Runway",
    "Bert",
    "Friends",
    "Bones",
    "Spartacus",
    "Mad Men",
    "OC"
  ];

  for (var i in titles) {
    programs.push({
      "name": titles[i],
      "url": titles[i].toLowerCase().trim().split(' ').join('-'),
      "leadtext": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lacinia dui sed sem ultricies, ac malesuada erat rhoncus. Sed dignissim felis non erat pretium interdum.",
      "b-line": "Random Genre",
      "synopsis": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lacinia dui sed sem ultricies, ac malesuada erat rhoncus. Sed dignissim felis non erat pretium interdum.",
      "start_time": new Date().toISOString()
    })
  }

  Program.create(programs, function(err) {
    if (err) console.log('Error while seeding');
    else console.log('Db seeded');
  });
}