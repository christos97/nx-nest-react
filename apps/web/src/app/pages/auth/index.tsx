import { SignUp } from '@ntua-saas-10/web/features/signup';
import { auth } from '@ntua-saas-10/web/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Auth: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  if (user) return <div>Logged in as {user?.email} </div>;

  return <SignUp />;
};

export default Auth;
