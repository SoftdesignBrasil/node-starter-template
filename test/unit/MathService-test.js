import { equal } from 'assert';
import MathService from '../../src/services/MathService';

describe('MathService service tests', () => {
  it('should return the sum of 1 and 2', () => {
    equal(MathService.sum(1, 2), 3);
  });
  it('should return the sub of 1 and 2', () => {
    equal(MathService.sub(1, 2), -1);
  });
});
