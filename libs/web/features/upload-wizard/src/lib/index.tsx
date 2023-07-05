import { createUploadFileSchema } from '@ntua-saas-10/shared-utils';
import { useAxios } from '@ntua-saas-10/web/hooks';
import { type FormEvent, forwardRef, useImperativeHandle, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useFormContext } from 'react-hook-form';

import { DropzoneInput, DropzoneSection, FileList, FileListItem } from './styles';
import type { UploadWizardFormData, UploadWizardProps, UploadWizardRef } from './types';

export const UploadWizard: React.ForwardRefExoticComponent<
  React.PropsWithoutRef<UploadWizardProps> & React.RefAttributes<UploadWizardRef>
> = forwardRef(({ path, mimeType = 'text/plain', maxFileSize = 5e6, formMetadata = {} }, ref) => {
  const axios = useAxios({
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  const schema = createUploadFileSchema({
    allowedTypes: [mimeType],
    maxFileSize,
  });

  const { setError, setValue, formState, clearErrors } = useFormContext<UploadWizardFormData>();

  const [files, setFiles] = useState<File[]>([]);

  const { errors } = formState;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const file = files[0];
    if (!file) {
      setError('root', { type: 'manual', message: 'Could not load file' });
      return;
    }
    const formData = new FormData();
    formData.append('datafile', file);
    formData.append('chartTitle', 'Where do my expenses go');

    const metadata = Object.assign({}, formMetadata);
    for (const key in metadata) {
      if (Object.prototype.hasOwnProperty.call(metadata, key)) {
        const value = metadata[key];
        if (value) {
          formData.append(key, value);
        }
      }
    }
    try {
      const response = await axios.post(path, formData);
      console.info('File uploaded successfully', response.data);
    } catch (error) {
      setError('root', { type: 'manual', message: 'Could not upload file' });
      console.error(error);
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const parsed = schema.safeParse(file);
      if (!parsed.success) {
        const errors = parsed.error.flatten().fieldErrors || {};
        const message = Object.values(errors || {})?.toString();
        setError('files', { type: 'manual', message });
      } else {
        clearErrors('files');
        setFiles([file]);
        setValue('files', [file]);
      }
    });
  };
  useImperativeHandle(ref, () => ({
    onSubmit,
    files,
  }));

  return (
    <>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps, acceptedFiles }) => (
          <DropzoneSection>
            <DropzoneInput {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </DropzoneInput>
            <aside>
              <h4>Files</h4>
              <FileList>
                {acceptedFiles.map((file) => (
                  <FileListItem key={file.name}>
                    {file.name} - {file.size} bytes
                  </FileListItem>
                ))}
              </FileList>
            </aside>
          </DropzoneSection>
        )}
      </Dropzone>

      {errors.files && <p className="error">{errors.files.message}</p>}
    </>
  );
});
