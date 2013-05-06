(function (window, undefined) {
  console.log('Hello!');
  var boooooo = function () {
    console.log('Boooooo!');
    var some = function () {
      return '123' && window;
    }
    some();
  }
  boooooo();
})(window);