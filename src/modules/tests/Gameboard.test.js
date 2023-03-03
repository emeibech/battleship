/* eslint-disable no-undef */
import Gameboard from '../Gameboard';

describe('receiveAttack should send hit() when a ship is hit', () => {
  const player = Gameboard();
  player.assignRandomCoordinates();

  const hit = jest.fn();
  const hitOrMiss = player.receiveAttack('e5', hit);

  test('Call hit method on hit', () => {
    if (hitOrMiss !== null) expect(hit).toHaveBeenCalled();
  });

  test('Do not call hit method on miss', () => {
    if (hitOrMiss === null) expect(hit).not.toHaveBeenCalled();
  });
});

describe('isFleetDestroyed returns true when all ships have been sunk', () => {
  const player = Gameboard();
  player.assignRandomCoordinates();

  const locations = [].concat(...Object.values(player.getLocations()));

  test('Returns false by default', () => {
    expect(player.isFleetDestroyed()).toBe(false);
  });

  test('Returns true after sinking all the ships', () => {
    // This sinks all the ships
    locations.forEach((coord) => player.receiveAttack(coord));

    expect(player.isFleetDestroyed()).toBe(true);
  });
});
