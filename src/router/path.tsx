import React, { ReactElement } from "react";

import HomePage from "../pages/HomePage";

export const homePagePath = "/";

interface IRoute {
  path: string;
  component: ReactElement<any, any>;
  children?: Omit<IRoute, "children">[];
}

export const routes: IRoute[] = [
  {
    path: homePagePath,
    component: <HomePage />,
  },
  
];
