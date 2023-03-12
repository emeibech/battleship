import Ship from './Ship';

const Gameboard = () => {
  const fleet = {
    carrier: Ship(5),
    battleship: Ship(4),
    cruiser: Ship(3),
    submarine: Ship(3),
    destroyer: Ship(2),
  };

  const locations = {};
  const neighboringTiles = [];
  const hits = {};
  const missedShots = [];
  let sunkenShips = 0;

  const isValidCoordinates = (coordinates) => {
    const firstVal = coordinates.charCodeAt() - 96;
    const secondVal = Number(coordinates.slice(1, 3));

    return firstVal < 11 && firstVal > 0 && secondVal < 11 && secondVal > 0;
  };

  // This just returns a valid random coordinates
  const getRandomCoordinates = () => {
    const randomNum = () => Math.floor(Math.random() * 10) + 1;
    return `${String.fromCharCode(randomNum() + 96)}${randomNum()}`;
  };

  const getAdjacentTiles = (coord) => {
    const tempArr = [];
    const incDecFirstVal = [0, +1, +1, +1, 0, -1, -1, -1];
    const incDecSecondVal = [-1, -1, 0, +1, +1, +1, 0, -1];

    while (incDecFirstVal.length > 0) {
      const firstValNum = coord.charCodeAt() - 48;
      const firstValStr = String.fromCharCode(
        firstValNum + incDecFirstVal.shift() + 48,
      );

      const secondVal = Number(coord.slice(1, 3)) + incDecSecondVal.shift();
      tempArr.push(firstValStr + secondVal);
    }

    return tempArr.filter((item) => isValidCoordinates(item));
  };

  const getNeighboringTiles = (location) => {
    const tempArr = [];

    location.forEach((coord) => {
      tempArr.push(...getAdjacentTiles(coord));
    });

    const newArr = tempArr.filter((coord) => {
      if (location.includes(coord)) return;
      return coord;
    });

    return [...new Set(newArr)];
  };

  // Returns random location for the ships
  const randomizeLocation = ({ length }) => {
    // Completes that coordinates based on the passed length
    const completeCoordinates = (coordinates) => {
      const orientation = Math.floor(Math.random() * 2);
      const firstVal = coordinates.at();
      const secondVal = Number(coordinates.slice(1, 3));
      let positiveOffset = 1;
      let negativeOffset = -1;

      const vertical = () => {
        const coordinatesArr = [coordinates];
        while (length > coordinatesArr.length) {
          const newCoord = firstVal + (secondVal + positiveOffset);

          if (isValidCoordinates(newCoord)) {
            coordinatesArr.push(newCoord);
            positiveOffset += 1;
          } else {
            coordinatesArr.unshift(firstVal + (secondVal + negativeOffset));
            negativeOffset -= 1;
          }
        }

        return coordinatesArr;
      };

      const horizontal = () => {
        const coordinatesArr = [coordinates];
        while (length > coordinatesArr.length) {
          const newFirstVal = String.fromCharCode(
            firstVal.charCodeAt() + positiveOffset,
          );
          const newCoord = newFirstVal + secondVal;

          if (isValidCoordinates(newCoord)) {
            coordinatesArr.push(newCoord);
            positiveOffset += 1;
          } else {
            coordinatesArr.unshift(
              String.fromCharCode(
                firstVal.charCodeAt() + negativeOffset,
              ) + secondVal,
            );
            negativeOffset -= 1;
          }
        }

        return coordinatesArr;
      };

      return (orientation === 0) ? vertical() : horizontal();
    };

    const random = getRandomCoordinates();
    return completeCoordinates(random);
  };

  // Checks for location overlaps
  const isValidLocation = (location) => {
    const occupied = [...neighboringTiles].concat(...Object.values(locations));

    const matched = location.filter((item) => occupied.includes(item));
    return matched.length === 0;
  };

  const assignRandomCoordinates = () => {
    Object.keys(fleet).forEach((ship) => {
      while (locations[ship] === undefined) {
        const location = randomizeLocation(fleet[ship]);

        if (isValidLocation(location)) {
          locations[ship] = location;
          neighboringTiles.push(...getNeighboringTiles(location));
        }
      }
    });
  };

  const placeShip = ({ ship, location }) => {
    locations[ship] = location;
  };

  const getLocations = () => locations;

  const findShip = (coordinates) => {
    let ship = null;

    Object.keys(locations).forEach((item) => {
      if (locations[item].includes(coordinates)) ship = item;
    });

    return ship;
  };

  const removeCoordinates = (coordinates) => {
    Object.keys(locations).forEach((ship) => {
      locations[ship] = locations[ship].filter((item) => item !== coordinates);
    });
  };

  const recordAttack = ({ ship, coordinates }) => {
    if (ship !== null) {
      removeCoordinates(coordinates);
      if (fleet[ship].isSunk()) sunkenShips += 1;
      hits[ship] = coordinates;
    } else {
      missedShots.push(coordinates);
    }
  };

  const hitShip = (ship) => fleet[ship].hit();

  const receiveAttack = (coordinates, cb = hitShip) => {
    const ship = findShip(coordinates);
    if (ship !== null) cb(ship);
    recordAttack({ ship, coordinates });
    return ship;
  };

  const isFleetDestroyed = () => Object.keys(fleet).length === sunkenShips;

  const restoreShips = () => {
    Object.keys(locations).forEach((ship) => {
      if (hits[ship]) locations[ship].push(...hits[ship]);
    });
  };

  const purgeShips = () => {
    Object.keys(locations).forEach((item) => {
      hits[item] = [];
    });
  };

  const purgeHits = () => {
    Object.keys(hits).forEach((item) => {
      hits[item] = [];
    });
  };

  const purgeMissedShots = () => {
    while (missedShots.length > 0) missedShots.pop();
  };

  assignRandomCoordinates();

  return {
    getRandomCoordinates,
    getLocations,
    isValidLocation,
    placeShip,
    receiveAttack,
    isFleetDestroyed,
    restoreShips,
    purgeShips,
    purgeHits,
    purgeMissedShots,
    assignRandomCoordinates,
  };
};

export default Gameboard;
