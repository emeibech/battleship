const Ship = (length) => {
  let hitCount = 0;
  const hit = () => { hitCount += 1; };
  const isSunk = () => length === hitCount;

  return {
    length,
    hit,
    isSunk,
  };
};

export default Ship;
