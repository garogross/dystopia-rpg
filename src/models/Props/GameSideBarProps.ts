import { ReactNode } from "react";

export interface GameSideBarProps {
    items: {
      link: string;
      name: string;
      component: ReactNode
      icon: React.ReactNode;
      disabled?: boolean;
    }[];
  }