import { Fragment } from "react";
import { Route, Routes, Outlet } from "react-router-dom";

import { routes } from "./path";

function AppRouter() {
  return (
    <Routes>
      {routes.map(({ path, component, children, indexComponent }, index) => (
        <Fragment key={index}>
          {children ? (
            <Route
              path={path}
              element={indexComponent ? component : <Outlet />}
            >
              <Route index element={indexComponent || component} />
              {children.map((child, childIndex) => (
                <Route
                  path={child.path}
                  element={child.component}
                  key={childIndex}
                />
              ))}
            </Route>
          ) : (
            <Route path={path} element={component} />
          )}
        </Fragment>
      ))}
    </Routes>
  );
}

export default AppRouter;
