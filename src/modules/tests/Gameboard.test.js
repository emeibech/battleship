/* eslint-disable no-undef */
import Gameboard from '../Gameboard';

describe('receiveAttack should send hit() when a ship is hit', () => {
  const player = Gameboard();
  const hit = jest.fn();
  const hitOrMiss = player.receiveAttack('e5', hit);

  test('Call hit method on hit', () => {
    if (hitOrMiss !== null) expect(hit).toHaveBeenCalled();
  });

  test('Do not call hit method on miss', () => {
    if (hitOrMiss === null) expect(hit).not.toHaveBeenCalled();
  });
});

describe('isFleetDestroyed checks if all ships have been sunk', () => {
  const player = Gameboard();
  const locations = [].concat(...Object.values(player.getLocations()));

  test('Return false by default', () => {
    expect(player.isFleetDestroyed()).toBe(false);
  });

  test('Return true after sinking all the ships', () => {
    // This sinks all the ships
    locations.forEach((coord) => player.receiveAttack(coord));

    expect(player.isFleetDestroyed()).toBe(true);
  });
});

describe('isValidLocation checks for location overlaps', () => {
  // A location is an array of coordinates
  const player = Gameboard();
  const locations = [].concat(...Object.values(player.getLocations()));
  const testArgs = ['a1', 'b2', 'c3', 'd4', 'e5', 'c6'].filter((coord) => {
    if (locations.includes(coord)) return;
    return coord;
  });

  test('Return false if given location overlaps with existing location', () => {
    expect(player.isValidLocation([locations[0]])).toBe(false);
  });

  test('Return true if given location does not overlap', () => {
    expect(player.isValidLocation(testArgs)).toBe(true);
  });
});

describe('getRandomCoordinates returns a random coordinates', () => {
  const player = Gameboard();
  const firstCall = player.getRandomCoordinates();
  test('Return different values each call', () => {
    expect(player.getRandomCoordinates()).not.toEqual(firstCall);
  });
});
