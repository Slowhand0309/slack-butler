
import {Executor} from './executor';

global.main = function() {
  const executor = new Executor();
  executor.execute();
}
