import {Notify} from './notify'

export class Translate {

  constructor() {

  }

  /**
   * Parse message from slack.
   *
   * e.g.
   * TRANSLATE_FROM=en
   * TRANSLATE_TO=ja
   *
   * [tl@hello] -> [こんにちは]
   * [tl@^こんにちは] -> [hello]
   */
  parse(str) {
    let text = str.split("@")[1];
    let from = '$TRANSLATE_FROM';
    let to = '$TRANSLATE_TO';

    if (/^\^/.test(text)) {
      // Reverse
      let buff = from;
      from = to;
      to = buff;
      // Remove '^'
      text = text.replace('^', '');
    }
    return this.translate(text, from, to);
  }

  /**
   * Translate.
   *
   * @param {String} text
   * @param {String} from
   * @param {String} to
   */
  translate(text, from, to) {
    return LanguageApp.translate(text, from, to);
  }
}
