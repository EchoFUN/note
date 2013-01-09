module.exports = function(grunt) {

  grunt.initConfig({
    // 初始化lint，其实就是调用jshint来验证你的代码
    lint: {
      // 需要验证的文件名，可以用 * 通配符
      all: ['grunt.js', 'mediator.js']
    },
    // jshint选项
    jshint: {
      options: {
        browser: true
      }
    },

    // 合并文件
    concat: {
      dist: {
        src: [
          '../components/jquery/jquery.js',
          'mediator.js',
          'chat.js'
          ],
        dest:"build/app.js"
      }
    }
  });

  grunt.registerTask('default', 'lint concat');
};