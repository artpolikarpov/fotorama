describe('Unit testing utils.js', function () {
  it('noop()', function () {
    expect(noop).toBeDefined();
  });

  it('minMaxLimit()', function () {
    expect(minMaxLimit(1, 2, 3)).toBe(2);
    expect(minMaxLimit(4, 2, 3)).toBe(3);
    expect(minMaxLimit(2.1, 2, 3)).toBe(2.1);
  });

  it('numberFromMeasure()', function () {
    expect(numberFromMeasure(0)).toBe(0);
    expect(numberFromMeasure(1)).toBe(1);
    expect(numberFromMeasure('1')).toBe(1);
    expect(numberFromMeasure('1px')).toBe(1);
    expect(numberFromMeasure('1.3px')).toBe(1.3);
    expect(numberFromMeasure('1p')).toBe(undefined);
    expect(numberFromMeasure('1.3%')).toBe(undefined);
  });

  it('numberFromPercent()', function () {
    expect(numberFromPercent(1)).toBe(undefined);
    expect(numberFromPercent('1%')).toBe(1);
    expect(numberFromPercent('1.2%')).toBe(1.2);
    expect(numberFromPercent('1.3px')).toBe(undefined);
  });

  it('numberFromWhatever()', function () {
    expect(numberFromWhatever('0')).toBe(0);
    expect(numberFromWhatever('0', 100)).toBe(0);
    expect(numberFromWhatever(1)).toBe(1);
    expect(numberFromWhatever('2')).toBe(2);
    expect(numberFromWhatever('3p')).toBe(undefined);
    expect(numberFromWhatever('3px')).toBe(3);
    expect(numberFromWhatever('3.4px')).toBe(3.4);
    expect(numberFromWhatever('4%')).toBe(undefined);
    expect(numberFromWhatever('4%', 200)).toBe(8);
    expect(numberFromWhatever('4.5%', -300)).toBe(-13.5);
    expect(numberFromWhatever('0', 0)).toBe(0);
    expect(numberFromWhatever('100%', 0)).toBe(0);
    expect(numberFromWhatever('100px', 0)).toBe(100);
    expect(numberFromWhatever('50%', 0)).toBe(0);
  });

  it('parsePosition()', function () {
    expect(parsePosition()).toEqual({x: '50%', y: '50%'});
    expect(parsePosition('')).toEqual({x: '50%', y: '50%'});
    expect(parsePosition('50px')).toEqual({x: '50px', y: '50%'});
    expect(parsePosition('0 0')).toEqual({x: '0', y: '0'});
    expect(parsePosition('50')).toEqual({x: '50', y: '50%'});
    expect(parsePosition('3p 50px')).toEqual({x: '50%', y: '50px'});
    expect(parsePosition('3p 50')).toEqual({x: '50%', y: '50'});
  });
});