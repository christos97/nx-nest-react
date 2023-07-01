import { useFormContext } from 'react-hook-form';

import { useAxios } from '@ntua-saas-10/web/hooks';
import { UiSpinnerButton } from '@ntua-saas-10/web/ui/spinner-button';
import { ChartType } from '@ntua-saas-10/shared-consts';

import type { UploadWizardFormData, UploadWizardProps } from './types';
import type { ZodRawShape } from 'zod';

/**
 * `UploadWizard` Web feature
 * @global `@ntua-saas-10/web/features/upload-wizard`
 */
const UploadWizard: React.FC<UploadWizardProps<ZodRawShape>> = ({ path, schema }) => {
  const axios = useAxios({
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitSuccessful, isValid, isSubmitting },
  } = useFormContext<UploadWizardFormData>();

  const onSubmit = async (data: UploadWizardFormData) => {
    if (!data.file) return;
    const formData = new FormData();
    const file = data.file[0];
    if (!file) {
      setError('root', { type: 'manual', message: 'Could not load file' });
      throw new Error('Could not load file');
    }

    formData.append('datafile', file);
    formData.append('chartType', ChartType.polarArea);

    const parsed = schema.safeParse(data.file[0]);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors || {};

      setError('file', { type: 'manual', message: errors['file']?.toString() });
      throw new Error(JSON.stringify(errors));
    }

    try {
      const response = await axios.post(path, formData);
      if (response.status < 300) {
        console.info('File uploaded successfully');
        setTimeout(reset, 1000);
      }
    } catch (error) {
      setError('file', { type: 'manual', message: 'Could not upload file' });
      console.error(error);
      throw error;
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="file" {...register('file', { required: 'File is required' })} />
      {errors.file && <p className="error">{errors.file.message}</p>}
      <UiSpinnerButton
        isDone={isSubmitSuccessful}
        disabled={!isValid}
        isLoading={isSubmitting && Object.keys(errors).length === 0}
        type="submit"
      >
        Upload File
      </UiSpinnerButton>
    </form>
  );
};

export default UploadWizard;
