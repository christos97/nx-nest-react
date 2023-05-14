import { ApiLookup } from '@ntua-saas-10/api-interfaces';
import { HookField, HookFieldProps } from '@ntua-saas-10/web/features/hook-field';
import { HookForm } from '@ntua-saas-10/web/features/hook-form';
import { UiButton } from '@ntua-saas-10/web/ui/button';
import { UiCard } from '@ntua-saas-10/web/ui/card';
import { z } from 'zod';

const INVALID_TITLE = 'Invalid title';
const INVALID_BODY = 'Invalid post body';

const title = 'title';
const titleField: HookFieldProps = {
  type: 'text',
  name: title,
  id: title,
  label: 'Title',
  placeholder: `Enter ${title}`,
  validation: {
    required: INVALID_TITLE,
  },
  props: {
    required: true,
  },
  errors: {
    required: `${title} is required`,
  },
};

const bodyField: HookFieldProps = {
  type: 'text',
  name: 'body',
  id: 'body',
  label: 'Post body',
  placeholder: '',
  validation: {
    required: INVALID_BODY,
  },
  props: {
    required: true,
  },
  errors: {
    required: 'Post body is required',
  },
};

const UpdatePostFormSchema = z
  .object({
    title: z.string().min(5, INVALID_TITLE),
    body: z.string().min(15, INVALID_BODY),
  })
  .strict();

const Home: React.FC = () => {
  const { path } = ApiLookup.services.upload;
  return (
    <UiCard>
      <HookForm path={path} schema={UpdatePostFormSchema}>
        <HookField {...titleField} />
        <HookField {...bodyField} />
        <UiButton type="submit">Submit</UiButton>
      </HookForm>
    </UiCard>
  );
};

export default Home;
