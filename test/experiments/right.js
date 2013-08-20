function extendEvent (e) {
  var touch = e.touches;
  e._x = getNumber(e.pageX, touch && touch[0].pageX);
  e._y = getNumber(e.clientY, touch && touch[0].clientY);
}