import SignUp from '../../components/SignUp';
import { auth } from '@ntua-saas-10/web/firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';

const Auth: React.FC = () => {
  const [user, loading, error] = useAuthState(auth)
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!user) return <SignUp />;
  else return <div>Logged in as { user?.email } </div>;

};

export default Auth;
