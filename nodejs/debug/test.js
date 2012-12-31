!function() {

  function add() {
    var args = arguments,
        i    = 0,
        ans  = 0;

    debugger;

    for (; i < arguments.length; i++) {
      ans += arguments[i];
    }

    return ans;
  }

  var ans = add(1,2,3,4,5,6,7);
  console.log(ans);
}();