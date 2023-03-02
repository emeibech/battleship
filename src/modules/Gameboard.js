import Ship from './Ship';

const Gameboard = () => {
  const ships = {
    carrier: Ship(5),
    battleship: Ship(4),
    cruiser: Ship(3),
    submarine: Ship(3),
    destroyer: Ship(2),
  };

  const coordinatesObj = {};

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

  const assignRandomCoordinates = () => {
    Object.keys(ships).forEach((ship) => {
      coordinatesObj[ship] = randomizeLocation(ships[ship]);
    });
  };

  assignRandomCoordinates();

  const getCoordinatesObj = () => coordinatesObj;

  // const receiveAttack = (coordinates) => {};

  return {
    randomizeLocation,
    getCoordinatesObj,
  };
};

export default Gameboard;
