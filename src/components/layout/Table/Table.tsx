import React, { ReactNode } from "react";

import styles from "./Table.module.scss";
import { TranslationItemType } from "../../../types/TranslationItemType";
import { useAppSelector } from "../../../hooks/redux";
import TransitionProvider, {
  TransitionStyleTypes,
} from "../../../providers/TransitionProvider";

interface ITableCol<T extends Record<string, TableColValue>> {
  key: keyof T;
  render?: (item: T) => ReactNode;
}

type TableColValue = string | number | boolean;
interface Props<T extends Record<string, TableColValue>> {
  headers: TranslationItemType[];
  data: T[];
  cols: ITableCol<T>[];
  columnsTemplate?: string;
  withoutBorder?: boolean;
}

const Table = <T extends Record<string, TableColValue>>({
  headers,
  data,
  cols,
  columnsTemplate,
  withoutBorder,
}: Props<T>) => {
  const language = useAppSelector((state) => state.ui.language);
  const gameInited = useAppSelector((state) => state.ui.gameInited);

  return (
    <div
      className={`${styles.table} ${
        withoutBorder ? styles.table_withoutBorder : ""
      }`}
      style={
        columnsTemplate
          ? { ["--table-grid-template-columns" as string]: columnsTemplate }
          : undefined
      }
    >
      <TransitionProvider
        inProp={gameInited}
        style={TransitionStyleTypes.zoomIn}
        className={`${styles.table__col} ${styles.table__col_header}`}
      >
        {headers.map((item, index) => (
          <div key={index} className={styles.table__headerText}>
            {item[language]}
          </div>
        ))}
      </TransitionProvider>
      {data.map((item, index) => (
        <div key={index} className={styles.table__col}>
          {cols.map((col, index) => (
            <TransitionProvider
              inProp={gameInited}
              style={TransitionStyleTypes.bottom}
              delay={index * 100}
              key={col.key.toString()}
              className={styles.table__bodyItem}
            >
              {col.render ? col.render(item) : item[col.key]}
            </TransitionProvider>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Table;
