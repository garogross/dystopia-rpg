import { ReactNode } from "react";

export interface RPGGameSideBarProps {
    items: {
      link: string;
      name: string;
      component: ReactNode
      icon: React.ReactNode;
      disabled?: boolean;
    }[];
  }