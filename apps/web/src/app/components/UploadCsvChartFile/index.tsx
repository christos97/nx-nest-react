import { zodResolver } from '@hookform/resolvers/zod';
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { ChartType } from '@ntua-saas-10/shared-consts';
import { UploadWizard, type UploadWizardRef } from '@ntua-saas-10/web/features/upload-wizard';
import { UiSpinnerButton } from '@ntua-saas-10/web/ui/spinner-button';
import React, { useEffect, useRef } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import { z } from 'zod';

import { MAX_FILE_SIZE } from '../../constants/app.constants';

const UploadCsvChartFormSchema = z.object({
  chartType: z.nativeEnum(ChartType),
  files: z.array(z.instanceof(File)),
});

type UploadWizardFormData = z.infer<typeof UploadCsvChartFormSchema>;

const UploadCsvChartFile: React.FC = () => {
  const methods = useForm<UploadWizardFormData>({
    resolver: zodResolver(UploadCsvChartFormSchema),
  });
  const { watch, control, formState } = methods;
  const wizardRef = useRef<UploadWizardRef>(null);
  const chartType = watch('chartType');
  const files = watch('files');

  useEffect(() => {
    if (files?.length > 0) {
      console.log('Files changed', files);
    }
  }, [files]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={wizardRef.current?.onSubmit}>
        <FormLabel component="legend">Chart Type</FormLabel>
        <Controller
          name="chartType"
          control={control}
          rules={{ required: true }}
          defaultValue={ChartType.line}
          render={({ field }) => (
            <RadioGroup {...field} row>
              {Object.values(ChartType).map((type) => (
                <FormControlLabel key={type} value={type} control={<Radio />} label={type} />
              ))}
            </RadioGroup>
          )}
        />
        <FormLabel component="legend">Upload a CSV file</FormLabel>
        <Controller
          name="files"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <UploadWizard
              {...field}
              ref={wizardRef}
              path={'datafiles'}
              mimeType="text/csv"
              maxFileSize={MAX_FILE_SIZE}
              formMetadata={{ chartType }}
            />
          )}
        />
        <UiSpinnerButton
          //isDone={false}
          disabled={!formState.isValid}
          isLoading={false}
          type="submit"
        >
          Upload File
        </UiSpinnerButton>
      </form>
    </FormProvider>
  );
};

export { UploadCsvChartFile };
export default UploadCsvChartFile;
