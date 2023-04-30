import { ApiLookup } from '@ntua-saas-10/api-interfaces';
import {
  HookForm,
  HookField,
  type HookFieldProps,
} from '@ntua-saas-10/web/features';
import { UiButton, UiCard } from '@ntua-saas-10/web/ui';
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

const UpdatePostFormSchema = z.object({
  title: z.string().min(8, INVALID_TITLE),
  body: z.string().min(30, INVALID_BODY),
}).strict();

const Home: React.FC = () => {
  const { posts } = ApiLookup.resources
  return (
    <UiCard>
      <HookForm
          {...posts.create}
          schema={UpdatePostFormSchema}
        >
        <HookField { ...titleField } />
        <HookField { ...bodyField } />
        <UiButton type="submit"/>
      </HookForm>
    </UiCard>

  );
};

export default Home;
