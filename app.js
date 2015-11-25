var labtechsnoop = require('./lib');

var rethinkdb = {
  hostname: $hostname,
  user: $user,
  pass: $pass,
};

var labtech = {
  hostname: $hostname,
  user: $user,
  pass: $pass,
};

var options = {
  labtech: labtech,
  rethinkdb: rethinkdb,
};

labtechsnoop(options);
