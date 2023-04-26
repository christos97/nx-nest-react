import { useForm } from 'react-hook-form';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import type { FirebaseError } from 'firebase/app';
import { UiButton } from '@ntua-saas-10/web/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { auth } from '@ntua-saas-10/web/firebase';

const SignUpFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type SignUpFormData = z.infer<typeof SignUpFormSchema>;

const SignUp: React.FC = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<SignUpFormData>({ resolver: zodResolver(SignUpFormSchema) });

  const onEmailSignUp = async (data: SignUpFormData) => {
    try {
      const { email, password } = data;
      await createUserWithEmailAndPassword(auth, email, password);
      // Handle successful sign-up
    } catch (error: unknown) {
      // Handle sign-up error
      const e = error as FirebaseError;
      setError('email', {
        type: e?.code,
        message: e?.message,
      });
    }
  };

  const onGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // Handle successful sign-up
    } catch (error: unknown) {
      // Handle sign-up error
      const e = error as FirebaseError;
      setError('root', {
        type: e?.code,
        message: e?.message,
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onEmailSignUp)}>
        <label>Email</label>
        <input
          type="email"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <p className="error">{errors.email?.message}</p>}
        <label>Password</label>
        <input
          type="password"
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <p className="error">{errors.password?.message}</p>}
        <UiButton type="submit" color="primary" text="Sign up with email" />
      </form>
      <div>
        <UiButton
          color="error"
          text="Sign up with Google"
          onClick={onGoogleSignIn}
        />
        {errors?.root && <p className="error">{errors?.root?.message}</p>}
      </div>
    </div>
  );
};

export default SignUp;
