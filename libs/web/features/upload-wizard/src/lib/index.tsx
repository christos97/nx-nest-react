import { Typography, TextField } from '@mui/material';
import { createUploadFileSchema } from '@ntua-saas-10/shared-utils';
import { useAxios } from '@ntua-saas-10/web/hooks';
import { type FormEvent, forwardRef, useImperativeHandle, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useFormContext } from 'react-hook-form';

import { DropzoneInput, DropzoneSection, FileList, FileListItem } from './styles';
import {
  FormMetadata,
  type UploadWizardFormData,
  type UploadWizardProps,
  type UploadWizardRef,
} from './types';

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

  const { formState, setError, setValue, clearErrors } = useFormContext<UploadWizardFormData>();

  const [files, setFiles] = useState<File[]>([]);

  const [fileId, setFileId] = useState<string | null>(null);
  const [renamedFileNames, setRenamedFileNames] = useState<{ [key: string]: string }>({});

  const [meta, setMeta] = useState<FormMetadata>({});
  const { errors } = formState;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const file = files[0];
    if (!file) {
      setError('root', { type: 'manual', message: 'Could not load file' });
      return;
    }
    const formData = new FormData();
    const fileName = renamedFileNames[file.name] || file.name;
    formData.append('datafile', file);
    formData.append('chartTitle', String(fileName));

    const metadata = Object.assign({}, formMetadata);
    for (const key in metadata) {
      if (Object.prototype.hasOwnProperty.call(metadata, key)) {
        const value = metadata[key];
        if (value) {
          formData.append(key, value);
        }
      }
    }
    setMeta(metadata);
    try {
      const { data } = await axios.post(path, formData);
      setFileId(data.file.id as string);
    } catch (error) {
      setError('root', { type: 'manual', message: 'Could not upload file' });
      setFileId(null);
      throw new Error('Could not upload file');
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const parsed = schema.safeParse(file);
      if (!parsed.success) {
        const errors = parsed.error.flatten().fieldErrors || {};
        const message = Object.values(errors || {})?.toString();
        setFiles([]);
        setValue('files', []);
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
    fileId,
    meta,
  }));

  return (
    <>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps, acceptedFiles }) => (
          <DropzoneSection>
            <DropzoneInput {...getRootProps()}>
              <input {...getInputProps()} />
              <Typography>Drag 'n' drop some files here, or click to select files</Typography>
            </DropzoneInput>
            <aside>
              <FileList>
                {acceptedFiles.map((file) => (
                  <FileListItem key={file.name}>
                    <Typography>Name your file</Typography>
                    <TextField
                      value={renamedFileNames[file.name] || file.name}
                      onChange={(e) => {
                        setRenamedFileNames((prevState) => ({
                          ...prevState,
                          [file.name]: e.target.value || file.name,
                        }));
                      }}
                    />
                    <Typography>
                      {renamedFileNames[file.name]} <br /> {file.size} bytes
                    </Typography>
                  </FileListItem>
                ))}
              </FileList>
            </aside>
          </DropzoneSection>
        )}
      </Dropzone>
      <Typography>{errors.files && <p className="error">{errors.files.message}</p>}</Typography>
    </>
  );
});
