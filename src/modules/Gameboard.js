import Ship from './Ship';

const Gameboard = () => {
  const fleet = {
    carrier: Ship(5),
    battleship: Ship(4),
    cruiser: Ship(3),
    submarine: Ship(3),
    destroyer: Ship(2),
  };

  const locations = {
    carrier: [],
    battleship: [],
    cruiser: [],
    submarine: [],
    destroyer: [],
  };

  const missedShots = [];
  let sunkenShips = 0;

  const isValidCoordinates = (coordinates) => {
    const firstVal = coordinates.charCodeAt() - 96;
    const secondVal = Number(coordinates.slice(1, 3));

    return firstVal < 11 && firstVal > 0 && secondVal < 11 && secondVal > 0;
  };

  // Returns random location for the ships
  const randomizeLocation = ({ length }) => {
    // This just returns a valid random coordinates
    const getRandomCoordinates = () => {
      const randomNum = () => Math.floor(Math.random() * 10) + 1;
      return `${String.fromCharCode(randomNum() + 96)}${randomNum()}`;
    };

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
    const occupied = [
      ...locations.carrier,
      ...locations.battleship,
      ...locations.cruiser,
      ...locations.submarine,
      ...locations.destroyer,
    ];

    const matched = location.filter((item) => occupied.includes(item));
    return matched.length === 0;
  };

  const assignRandomCoordinates = () => {
    Object.keys(fleet).forEach((ship) => {
      while (locations[ship].length === 0) {
        const location = randomizeLocation(fleet[ship]);
        if (isValidLocation(location)) locations[ship] = location;
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

  return {
    assignRandomCoordinates,
    getLocations,
    isValidLocation,
    placeShip,
    receiveAttack,
    isFleetDestroyed,
  };
};

export default Gameboard;
