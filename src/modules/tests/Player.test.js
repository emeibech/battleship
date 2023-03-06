/* eslint-disable no-undef */
import Player from '../Player';

describe('attack should send receiveAttack to opponent Gameboard', () => {
  const player = Player();
  const mock = jest.fn();

  test('mock should be called when attacking', () => {
    player.attack('d4', mock);
    expect(mock).toHaveBeenCalled();
  });
});
