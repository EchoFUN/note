var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , db       = mongoose.createConnection('mongodb://localhost/blog');

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('yay!~');
});

var articleSchema = new Schema({
    title     : String
  , body      : String
  , create_at : Date
});

articleSchema.methods.read = function() {
  console.log("I'm start reading ", this.title);
};

var Article = db.model('Articles', articleSchema);

// var article = new Article({
//     title: "摩托车艺术"
//   , body : '呵呵'
//   , create_at: new Date()
// })

// article.read();

// article.save(function(err) {
//   if (err) 
//     console.log('save error');
//   else 
//     console.log('done');
// });

Article
  .find({})
  .limit(10)
  .sort('-create_at')
  .select('title create_at')
  .exec(function(err, results) {
    results.forEach(function(article) {
      console.log(article);
    });
  });


