
(function(root) {

  function genhtml() {
    var outer = document.getElementById('outer')
      , p     = null
    for (var i = 1; i <= 20000; i++) {
      p = document.createElement('p')
      p.innerHTML = i;
      outer.appendChild(p)
    }
  }

  var timmer = function(fn) {
    var start = new Date();
    fn();
    alert(new Date - start);
  }

  var simpleSwitch = function() {
    var outer = document.getElementById('outer')
      , ps = Array.prototype.slice.call(outer.getElementsByTagName('p'))
    while(ps.length != 0) {
      outer.appendChild(ps.pop())
    }
  }

  var fragmentSwitch = function() {
      var outer = document.getElementById('outer')
        , fragment = document.createDocumentFragment()
        , ps = Array.prototype.slice.call(outer.getElementsByTagName('p'))

      while(ps.length != 0) {
        fragment.appendChild(ps.pop())
      }

      outer.innerHTML = ""
      outer.appendChild(fragment)
  }

  window.onload = function() {
    genhtml();
    timmer(simpleSwitch);
    // timmer(fragmentSwitch);
  };

}).call(this);