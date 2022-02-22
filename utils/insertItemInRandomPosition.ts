function insertItemInRandomPosition(arr: Array<any>, item: any) {
  const emptyPositions: Array<number> = [];
  arr.forEach((item, i) => {
    if (item == 0) {
      emptyPositions.push(i);
    }
  });
  const randomPosition = Math.floor(Math.random() * emptyPositions.length);
  arr.splice(emptyPositions[randomPosition], 1, item);
}

export default insertItemInRandomPosition;
