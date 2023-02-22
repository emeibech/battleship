/* eslint-disable no-undef */
import Ship from '../Ship';

test('isSunk returns true if hit count matches length', () => {
  const twoLengthShip = Ship(2);
  expect(twoLengthShip.isSunk()).toBe(false);

  twoLengthShip.hit();
  expect(twoLengthShip.isSunk()).toBe(false);

  twoLengthShip.hit();
  expect(twoLengthShip.isSunk()).toBe(true);
});
