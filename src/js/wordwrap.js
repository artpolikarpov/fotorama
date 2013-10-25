  // This function will wrap the first x words in a p with class y,
  // where x is option wrapword['count'] and y is option wrapword['wrapclass']
  // The remaining text will be inserted into a paragraph with class wrapword['restclass']
  function wordWrap(sentence, opts) {

      if (opts['wrapword']) {

          var phrase = "";

          // Account for stupid whitespace
          if (sentence.substring(0,1) == " ") {
              sentence = sentence.slice(1);
          }

          for (i = 0; i < opts['wrapword']['count']; i++) {
              phrase = phrase + " " + sentence.split(" ")[i];
          }

          var wrappedPhrase = '<p class="' + opts['wrapword']['wrapclass'] + '">' + phrase + '</p>';

          sentence = sentence.slice(phrase.length);
          sentence = '<p class="' + opts['wrapword']['restclass'] + '">' + sentence + '</p>';

          sentence = wrappedPhrase + sentence;
      }
      return sentence;
  }