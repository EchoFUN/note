
/*
 * GET home page.
 */
var blog = require('./blog').blog;

exports.index = function(req, res){
  // console.log(blog);
  res.render('index', { title: 'Express' });
  // res.send("blog.create.toString()");
};

exports.createBlog = blog.create;