import { FC } from "react";
import styles from "./styles.module.scss";

type blockProps = {
  number: number;
};

const Block: FC<blockProps> = ({ number }) => {
  return (
    <div className={`${styles.block} ${number == 0 ? styles.empty : ""}`}>
      {number > 0 ? number : ""}
    </div>
  );
};

export default Block;
