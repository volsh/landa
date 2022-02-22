function insertItemInRandomPosition(
  arr: Array<any>,
  item: any,
  count: number = 1
) {
  let randomPosition;
  for (let i = 0; i < count; i++) {
    do {
      randomPosition = Math.floor(Math.random() * arr.length);
    } while (arr[randomPosition]);
    arr.splice(randomPosition, 1, item);
  }
}

export default insertItemInRandomPosition;
