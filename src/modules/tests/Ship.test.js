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

/* hit method doesn't need a unit test because its side effect is invisible from
  the outside and it's already being tested indirectly with the isSunk test. */
