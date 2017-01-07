
import {Executor} from './executor';
import {Interactive} from './interactive';

global.main = function() {
  const executor = new Executor();
  executor.execute();
}

global.doPost = function(e) {
  const interactive = new Interactive('$SLACK_SENT_TOKEN', '$SLACK_TRIGGER_WORD');
  interactive.doResponse(e);
}
