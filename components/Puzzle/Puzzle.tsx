import {
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import insertItemInRandomPosition from "../../utils/insertItemInRandomPosition";
import createTwoDimentionArray from "../../utils/createTwoDimentionArray";
import styles from "./styles.module.scss";
import Block from "../Block/Block";

const size = 4;
const initialNumber = 2;
const initialArr = new Array(size * size).fill(0);
insertItemInRandomPosition(initialArr, initialNumber);
insertItemInRandomPosition(initialArr, initialNumber);

const Puzzle = () => {
  const [blocks, setBlocks] = useState(initialArr);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const isComplete = blocks.every(
      (value, i) =>
        value > 0 &&
        !((i + 1) % size > 0 && blocks[i + 1] == value) &&
        !(i < size * size - size && blocks[i + size] == value)
    );
    setIsComplete(isComplete);
  }, [blocks]);

  const handleKeyDown = (ev: any) => {
    const { which } = ev;
    setBlocks((prev) => getBlockAfterMove([...prev], which));
  };

  const getBlockAfterMove = (blocksClone: Array<number>, which: number) => {
    let k, current;
    switch (which) {
      case 37: //left
        for (let i = 0; i < blocksClone.length; i += size) {
          for (let j = i + 1; j < i + size; j++) {
            current = blocksClone[j];
            if (current) {
              k = j - 1;
              while (!blocksClone[k] && k >= i) {
                blocksClone[k] = current;
                blocksClone[k + 1] = 0;
                k--;
              }
              if (blocksClone[k] == blocksClone[k + 1]) {
                blocksClone[k] = blocksClone[k] * 2;
                blocksClone[k + 1] = 0;
              }
            }
          }
        }
        break;
      case 38: //up
        for (let i = 0; i < size; i++) {
          for (let j = i + size; j <= size * size - size + i; j += size) {
            current = blocksClone[j];
            if (current) {
              k = j - size;
              while (!blocksClone[k] && k >= i) {
                blocksClone[k] = current;
                blocksClone[k + size] = 0;
                k = k - size;
              }
              if (blocksClone[k] == blocksClone[k + size]) {
                blocksClone[k] = blocksClone[k] * 2;
                blocksClone[k + size] = 0;
              }
            }
          }
        }
        break;
      case 39: //right
        for (let i = 0; i < blocksClone.length; i += size) {
          for (let j = i + size - 2; j >= i; j--) {
            current = blocksClone[j];
            if (current) {
              k = j + 1;
              while (!blocksClone[k] && k < i + size) {
                blocksClone[k] = current;
                blocksClone[k - 1] = 0;
                k++;
              }
              if (blocksClone[k] == blocksClone[k - 1]) {
                blocksClone[k] = blocksClone[k] * 2;
                blocksClone[k - 1] = 0;
              }
            }
          }
        }
        break;
      case 40: //down
        for (let i = 0; i < size; i++) {
          for (let j = size * size - size + i; j >= i; j -= size) {
            current = blocksClone[j];
            if (current) {
              k = j + size;
              while (!blocksClone[k] && k <= size * size - size + i) {
                blocksClone[k] = current;
                blocksClone[k - size] = 0;
                k = k + size;
              }
              if (blocksClone[k] == blocksClone[k - size]) {
                blocksClone[k] = blocksClone[k] * 2;
                blocksClone[k - size] = 0;
              }
            }
          }
        }
        break;
    }
    insertItemInRandomPosition(blocksClone, initialNumber);
    return blocksClone;
  };

  const twoDimBlocks = useMemo(() => {
    return createTwoDimentionArray(blocks, size);
  }, [blocks]);
  const totalSum = useMemo(() => {
    return isComplete ? blocks.reduce((acc, value) => value + acc, 0) : 0;
  }, [isComplete]);
  return (
    <div className={styles.container}>
      <div className={styles.puzzle}>
        {twoDimBlocks.map((row, rowIndex) => {
          return (
            <div key={rowIndex.toString()} className={styles["block-row"]}>
              {row.map((number: number, colIndex: number) => {
                return <Block key={colIndex.toString()} number={number} />;
              })}
            </div>
          );
        })}
      </div>
      {totalSum > 0 && (
        <p className={styles.complete}>
          Game complete! Total Sum is {totalSum}
        </p>
      )}
    </div>
  );
};

export default Puzzle;
