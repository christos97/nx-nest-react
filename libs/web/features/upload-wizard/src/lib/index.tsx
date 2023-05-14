import React from 'react';
import { useForm } from 'react-hook-form';
import { useAxios } from '@ntua-saas-10/web/hooks';
import { ContentType } from './constants';
import { UploadWizardProps } from './types';
import { ZodRawShape } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UiButton } from '@ntua-saas-10/web/ui/button';

type FormData = {
  file: FileList;
};

/**
 * `UploadWizard` Web feature
 * @global `@ntua-saas-10/web/features/upload-wizard`
 */
const UploadWizard: React.FC<UploadWizardProps<ZodRawShape>> = ({ path, schema, mimeType, metadata }) => {
  const [axios] = useAxios({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append('file', data.file[0]);
    try {
      const response = await axios.post(path, formData, {
        headers: {
          'Content-Type': ContentType.multipart_form_data,
        },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="file" {...register('file', { required: 'Please select a file' })} />
      {errors.file && <p className="error">{errors.file.message}</p>}
      <UiButton type="submit">Submit</UiButton>
    </form>
  );
};

export default UploadWizard;
