import { equal } from 'assert';
import Calc from '../src/routes/Calc';

describe('Calc service tests', () => {
  it('should return the sum of 1 and 2', () => {
    equal(Calc.sum(1, 2), 3);
  });
  it('should return the sub of 1 and 2', () => {
    equal(Calc.sub(1, 2), -1);
  });
});
