import { useFormContext } from 'react-hook-form';
import { useAxios } from '@ntua-saas-10/web/hooks';
import { UiButton } from '@ntua-saas-10/web/ui/button';

import type { UploadWizardFormData, UploadWizardProps } from './types';
import type { ZodRawShape } from 'zod';

/**
 * `UploadWizard` Web feature
 * @global `@ntua-saas-10/web/features/upload-wizard`
 */
const UploadWizard: React.FC<UploadWizardProps<ZodRawShape>> = ({ path, schema }) => {
  const [axios] = useAxios({
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<UploadWizardFormData>();

  const onSubmit = async (data: UploadWizardFormData) => {
    const formData = new FormData();
    formData.append('datafile', data.file[0]);
    formData.append('chartType', 'bar');
    const parsed = schema.safeParse(data.file[0]);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      throw new Error(JSON.stringify(errors));
    }
    try {
      const response = await axios.post(path, formData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="file" {...register('file', { required: 'File is required' })} />
      {errors.file && <p className="error">{errors.file.message} HERE</p>}
      <UiButton type="submit">Upload File</UiButton>
    </form>
  );
};

export default UploadWizard;
