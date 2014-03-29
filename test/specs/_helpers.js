function waitsFor (test, fn) {
  if (test()) {
    fn();
  } else {
    setTimeout(function () {
      waitsFor(test, fn);
    }, 10);
  }
}