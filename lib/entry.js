
class Hoge {
  constructor(fuga) {
    this.fuga = fuga;
  }

  say() {
    Logger.log(this.fuga);
  }
}

global.main = function() {
  var hoge = new Hoge('1234');
  hoge.say();
}
