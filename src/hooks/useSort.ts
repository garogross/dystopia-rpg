import { useState, useCallback } from "react";

export const useSort = (initialSort: string = "") => {
  const [activeSort, setActiveSort] = useState(initialSort);

  const handleSortChange = useCallback((id: string) => {
    setActiveSort((prevSort) => {
      if (prevSort === `${id}+`) return `${id}-`;
      if (prevSort === `${id}-`) return `${id}+`;
      return `${id}+`;
    });
  }, []);

  return {
    activeSort,
    handleSortChange,
  };
};
