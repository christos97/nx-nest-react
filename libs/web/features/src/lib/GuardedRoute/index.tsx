import { Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@ntua-saas-10/web/firebase';

interface GuardedRouteProps {
    Component: React.FC;
    path: string;
    exact?: boolean;
    roles?: string[];
    uid?: string;
    redirectPath: string;
}

const GuardedRoute: React.FC<GuardedRouteProps> = ({ Component, redirectPath = '/', ...rest }) => {
  const [user] = useAuthState(auth);
  return user ? (
    <Route {...rest} element={<Component />} />
  ) : (
    <Route path={redirectPath}/>
  );
};

export default GuardedRoute;
