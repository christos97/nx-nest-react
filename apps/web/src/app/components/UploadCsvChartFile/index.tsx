import { zodResolver } from '@hookform/resolvers/zod';
import { Box, FormControlLabel, FormLabel, Radio, RadioGroup, Stack } from '@mui/material';
import { ChartType } from '@ntua-saas-10/shared-consts';
import { UploadWizard, type UploadWizardRef } from '@ntua-saas-10/web/features/upload-wizard';
import { UiSpinnerButton } from '@ntua-saas-10/web/ui/spinner-button';
import React, { useEffect, useRef } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import { z } from 'zod';

import { MAX_FILE_SIZE } from '../../constants/app.constants';
import { StepperActions } from '../Stepper';

const { line, bubble, multiAxisLine, polarArea, radar, scatter } = ChartType;
const UploadCsvChartFormSchema = z.object({
  chartTitle: z.string().default('default chart title'),
  chartType: z.nativeEnum(ChartType),
  files: z.array(z.instanceof(File)),
});

type UploadWizardFormData = z.infer<typeof UploadCsvChartFormSchema>;

const ChartTypeLabels = {
  [line]: 'Line',
  [bubble]: 'Bubble',
  [multiAxisLine]: 'Multi-Axis Line ',
  [polarArea]: 'Polar Area',
  [radar]: 'Radar',
  [scatter]: 'Scatter',
} as const;

interface UploadCsvChartFileProps {
  setActiveStep: (value: React.SetStateAction<StepperActions>) => void;
  setFileId: (value: React.SetStateAction<string>) => void;
}

export const UploadCsvChartFile: React.FC<UploadCsvChartFileProps> = ({
  setActiveStep,
  setFileId,
}) => {
  const methods = useForm<UploadWizardFormData>({
    resolver: zodResolver(UploadCsvChartFormSchema),
  });
  const { control, formState, watch } = methods;
  const wizardRef = useRef<UploadWizardRef>(null);
  const chartType = watch('chartType');
  useEffect(() => {
    if (wizardRef.current?.fileId) {
      setActiveStep((prev) => (prev + 1) as StepperActions);
      setFileId(wizardRef.current?.fileId);
    }
  }, [wizardRef.current?.fileId, setActiveStep, setFileId]);

  return (
    <Box sx={{ p: 8 }}>
      <FormProvider {...methods}>
        <form
          onSubmit={(e) => {
            if (wizardRef.current?.meta) {
              wizardRef.current.meta = { chartType };
              wizardRef.current?.onSubmit(e);
            }
          }}
        >
          <Stack spacing={6} alignItems="center" justifyContent="center">
            <FormLabel component="legend">Upload a CSV file</FormLabel>
            <Controller
              name="files"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <UploadWizard
                  {...field}
                  ref={wizardRef}
                  path="datafiles"
                  mimeType="text/csv"
                  maxFileSize={MAX_FILE_SIZE}
                  formMetadata={{ chartType }}
                />
              )}
            />

            <FormLabel component="legend">Select Chart Type</FormLabel>
            <Controller
              name="chartType"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <RadioGroup {...field} row>
                  {Object.values(ChartType).map((type) => (
                    <FormControlLabel
                      key={type}
                      value={type}
                      control={<Radio />}
                      label={ChartTypeLabels[type]}
                    />
                  ))}
                </RadioGroup>
              )}
            />
            <UiSpinnerButton
              //isDone={false}
              disabled={!formState.isValid || wizardRef.current?.files.length === 0}
              isLoading={formState.isSubmitting}
              type="submit"
            >
              Upload File
            </UiSpinnerButton>
          </Stack>
        </form>
      </FormProvider>
    </Box>
  );
};
