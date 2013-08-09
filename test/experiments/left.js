function extendEvent (e) {
  var touch = (e.touches || [])[0] || {};
  e._x = getNumber(e.pageX, touch.pageX);
  e._y = getNumber(e.clientY, touch.clientY);
}