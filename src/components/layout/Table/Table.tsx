import React, { ReactNode } from "react";

import styles from "./Table.module.scss";

interface ITableCol<T extends Record<string, TableColValue>> {
  key: keyof T;
  render?: (item: T) => ReactNode;
}

type TableColValue = string | number | boolean;
interface Props<T extends Record<string, TableColValue>> {
  headers: string[];
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
      <div className={`${styles.table__col} ${styles.table__col_header}`}>
        {headers.map((item, index) => (
          <div key={index} className={styles.table__headerText}>
            {item}
          </div>
        ))}
      </div>
      {data.map((item, index) => (
        <div key={index} className={styles.table__col}>
          {cols.map((col) => (
            <div key={col.key.toString()} className={styles.table__bodyItem}>
              {col.render ? col.render(item) : item[col.key]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Table;
