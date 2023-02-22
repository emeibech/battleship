/* eslint-disable no-undef */
import Ship from '../Ship';

test('isSunk returns true if hit count matches length', () => {
  // default hit count is 0
  const twoLengthShip = Ship(2);
  expect(twoLengthShip.isSunk()).toBe(false);

  const zeroLengthShip = Ship(0);
  expect(zeroLengthShip.isSunk()).toBe(true);
});

/* .hit() method can be called to increase hit count
  but I think that's for integration test so I removed it */
