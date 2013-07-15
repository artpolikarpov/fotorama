var S = {};

S.times = function (n, iterator, context) {
  var accum = Array(Math.max(0, n));
  for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
  return accum;
};

S.test = function (testName, test, n, context) {
  console.time(testName);
  S.times(n || 100, function () {
    S.test.before && S.test.before();

    test();

    S.test.after && S.test.after();
  }, context);
  console.timeEnd(testName);
}