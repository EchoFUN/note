
(function() {

  // 创建一个初始的mediator对象
  var mediator = new Mediator();

  $('#charForm').on('submit', function(e) {
    e.preventDefault();

    // 从页面中获取详细信息
    var text = $('#chatBox').val(),
        from = $('#formBox').val(),
        to   = $('#toBox').val();

    // 发布消息
    mediator.Publish('newMessage', {message: text, from: from, to: to});
  });


  function displayChat(data) {
    var date = new Date(),
        message = data.from + ' said "' + data.message + '" to' + data.to;

    $('#charResult')
      .prepend('<p>' + message + '(' + date.toLocaleTimeString() + ')</p>');
  }


  function logChat(data) {
    if (window.console) {
      console.log(data);
    }
  }

  // 注册两个方法
  mediator.Subscribe('newMessage', displayChat);
  mediator.Subscribe('newMessage', logChat);

  function amITackingToMyself(data) {
    return data.from == data.to;
  }

  function iAmClearlyCrazy(data) {
    $( "#chatResult" ).prepend("<p>" + data.from + " is talking to himself.</p>");
  }

  mediator.Subscribe('newMessage', function(data) {
    if (amITackingToMyself(data))
      iAmClearlyCrazy(data);
  });
})();
