import { Fragment, Suspense, useState } from "react";
import { Route, Routes, Outlet } from "react-router-dom";

import { routes } from "./path";
import AppLoader from "../components/AppLoader/AppLoader";
import { ESplashTypes } from "../constants/ESplashTypes";

function AppRouter() {
  const [timerFinished, setTimerFinished] = useState(true);
  return (
    <Suspense
      fallback={
        <AppLoader
          loading={true}
          timerFinished={timerFinished}
          setTimerFinished={setTimerFinished}
          type={ESplashTypes.CYBERFARM}
        />
      }
    >
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
    </Suspense>
  );
}

export default AppRouter;
