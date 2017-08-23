const expect = require('expect');
const {isRealString} = require('./validation');

//import isRealString
  //should reject non-string -- pass a non string something
  //should reject string with only spaces
  //show allow strings with non-space characters
describe('isRealString', ()=>{

  it('should reject non-string', () => { // no need to provide done since its not asynchronus function
    var res = isRealString(3333);
    expect(res).toBe(false);
  });

  it('should reject string with only spaces', () => {
    var res = isRealString('             ');
    expect(res).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    var res = isRealString('  Andrew  ');
    expect(res).toBe(true);
  });


});
