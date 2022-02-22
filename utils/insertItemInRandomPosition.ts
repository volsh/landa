function insertItemInRandomPosition(
  arr: Array<any>,
  item: any,
  count: number = 1
) {
  const emptyPositions: Array<number> = [];
  let randomPosition;
  arr.forEach((item, i) => {
    if (item == 0) {
      emptyPositions.push(i);
    }
  });
  for (let i = 0; i < count; i++) {
    randomPosition = Math.floor(Math.random() * emptyPositions.length);
    arr.splice(emptyPositions[randomPosition], 1, item);
    emptyPositions.splice(randomPosition, 1);
  }
}

export default insertItemInRandomPosition;
