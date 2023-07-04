import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { Divider, Stack, colors } from '@mui/material';
import { TranslationKeys } from '@ntua-saas-10/shared-consts';
import { auth } from '@ntua-saas-10/web/firebase';
import { useFsDoc } from '@ntua-saas-10/web/hooks';
import { UiButton } from '@ntua-saas-10/web/ui/button';
import { UiCard } from '@ntua-saas-10/web/ui/card';
import { UiProgressSpinner } from '@ntua-saas-10/web/ui/progress-spinner';
import { UiSpinnerButton } from '@ntua-saas-10/web/ui/spinner-button';
import type { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import hoistStatics from 'hoist-non-react-statics';
import type { TFunction } from 'i18next';
import { useMemo } from 'react';
import { FormContainer, TextFieldElement, useForm } from 'react-hook-form-mui';
import { withTranslation } from 'react-i18next';

import { TRANSLATION_KEY_PREFIX } from './constants';
import {
  type SignUpFormData,
  type SignUpFormSpecs,
  getPasswordSchema,
  getSignUpFormSchema,
} from './schema';
import { getErrorMessages } from './utils';

interface SignUpProps {
  t: TFunction;
}

const StyledUiCard = styled(UiCard)(() => ({
  maxWidth: '400px',
}));

const FlexContainer = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  justifyContent: 'center',
  alignItems: 'center',
}));

const SignUp: React.FC<SignUpProps> = ({ t }) => {
  const SignUpFormSchema = getSignUpFormSchema(t, getPasswordSchema(t));
  const [formSpec] = useFsDoc<SignUpFormSpecs>('form-specs/signup-form');

  const [fields, defaultValues] = useMemo(() => {
    const { fields, defaultValues } = formSpec || {};
    return [fields, defaultValues];
  }, [formSpec]);

  const resolver = zodResolver(SignUpFormSchema);
  const ctx = useForm<SignUpFormData>({
    defaultValues,
    resolver,
    mode: 'onChange',
  });

  const signUpWithEmail = async ({ email, password }: SignUpFormData) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: unknown) {
      onError(error as FirebaseError);
    }
  };

  const onGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error: unknown) {
      onError(error as FirebaseError);
    }
  };

  const onError = (e: FirebaseError) => {
    //const { errors } = TranslationKeys.auth
    const { emailAlreadyInUse } = getErrorMessages(t);
    switch (e.code) {
      case 'auth/email-already-in-use':
        ctx.setError('email', { type: 'manual', message: emailAlreadyInUse() });
        break;
      default:
        break;
    }
    ctx.setError('root', { type: 'manual', message: e.message });
  };

  const ErrorDisplay = ({ error }: { error?: string }) => {
    return error ? <p className="error">{error}</p> : null;
  };

  const SignUpForm = ({ fields, defaultValues }: SignUpFormSpecs) => {
    return (
      <FormContainer onSuccess={signUpWithEmail} formContext={ctx}>
        <Stack spacing={3}>
          <TextFieldElement {...fields.email} label={t(fields.email.name)} />
          <TextFieldElement {...fields.password} label={t(fields.password.name)} />
          <TextFieldElement {...fields.passwordRepeat} label={t(fields.passwordRepeat.name)} />
          <UiSpinnerButton
            isLoading={ctx.formState.isSubmitting}
            isDone={ctx.formState.isSubmitSuccessful}
            disabled={!ctx.formState.isValid}
            type="submit"
            color="primary"
          >
            {t(TranslationKeys.auth.signUpWithEmail)}
          </UiSpinnerButton>
        </Stack>
      </FormContainer>
    );
  };

  return (
    <FlexContainer>
      <StyledUiCard>
        <UiButton color="error" onClick={onGoogleSignIn}>
          {t(TranslationKeys.auth.signUpWithGoogle)}
        </UiButton>
        <Divider sx={{ color: colors.purple[200], zIndex: '100' }} flexItem>
          <p>{t(TranslationKeys.auth.or)}</p>
        </Divider>
        {fields && defaultValues ? (
          <SignUpForm fields={fields} defaultValues={defaultValues} />
        ) : (
          <UiProgressSpinner />
        )}
        {/*
          {ctx.formState.errors && <ErrorDisplay error={ctx.formState.errors.email?.message} />}
         */}
      </StyledUiCard>
    </FlexContainer>
  );
};
export default hoistStatics(
  withTranslation('translation', { keyPrefix: TRANSLATION_KEY_PREFIX })(SignUp),
  SignUp,
);
