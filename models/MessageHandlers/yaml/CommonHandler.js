const yaml = require('js-yaml');
const path = require('path');
const fs   = require('fs');

const yaml_dir = '/../../yaml/examples';

module.exports = {
  handleGreeting: function(options, cb) {
    try {
      var doc = yaml.safeLoad(fs.readFileSync(path.join(__dirname + yaml_dir) + '/greetings.yml', 'utf8'));
      cb(yaml.safeDump(doc));
    } catch (e) {
      console.log(e);
    }
  },

  handleDoSomethingElse: function(options, cb) {
    try {
      var doc = yaml.safeLoad(fs.readFileSync(path.join(__dirname + yaml_dir) + '/do_something.yml', 'utf8'));
      cb(yaml.safeDump(doc));
    } catch (e) {
      console.log(e);
    }
  }
};
