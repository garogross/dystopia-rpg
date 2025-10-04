import { useState, useCallback } from "react";

type SortDirection = "+" | "-";
type SortState<T extends string> = `${T}${SortDirection}` | "";

export const useSort = <T extends string>(initialSort?: T) => {
  const [activeSort, setActiveSort] = useState<SortState<T>>(
    initialSort ? `${initialSort}+` : ""
  );

  const handleSortChange = useCallback((id: T) => {
    setActiveSort((prevSort) => {
      if (prevSort === `${id}+`) return `${id}-` as SortState<T>;
      if (prevSort === `${id}-`) return `${id}+` as SortState<T>;
      return `${id}+` as SortState<T>;
    });
  }, []);

  return {
    activeSort,
    handleSortChange,
  };
};
