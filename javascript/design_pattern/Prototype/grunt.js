module.exports = function(grunt) {
  grunt.initConfig = {
    lint: {
      all: ['prototype.js', 'grunt.js']
    },

    jshint: {
      browser: true
    }
  };
  grunt.registerTask('default', 'lint cancat');
};