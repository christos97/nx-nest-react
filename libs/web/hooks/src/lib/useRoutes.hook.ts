import { auth } from '@ntua-saas-10/web/firebase';
import React, { createElement } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { RouteObject, redirect } from 'react-router-dom';

interface AppRoutes {
  [key: string]: {
    path: string;
    page: string;
    isGuarded: boolean;
    claims: readonly string[];
    FcComponent?: React.FC;
  };
}

export const useRoutes = (appRoutes: AppRoutes) => {
  const [user] = useAuthState(auth);

  const routes: RouteObject[] = Object.values(appRoutes).map((value) => {
    const { path, isGuarded, /* claims, */ page, FcComponent } = value;

    if (FcComponent && !isGuarded) {
      return {
        path,
        element: createElement(FcComponent),
        redirectTo: '/',
      };
    }
    if (FcComponent && isGuarded && user) {
      return {
        path,
        element: createElement(FcComponent),
      };
    }
    if (FcComponent && isGuarded && !user) {
      console.log('render');
      redirect('/', { status: 404 });
      return {
        path,
        element: createElement(FcComponent),
      };
    }

    // Lazy loading doesnt work rn
    // this if block never executes
    if (!FcComponent && isGuarded && user) {
      return {
        path,
        element: createElement(React.lazy(() => import(`../pages/${page}/index.tsx`))),
      };
    }

    return {
      path,
      redirectTo: '/',
    };
  });

  return routes;
};
