import { Box } from '@mui/material';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import React, { useState } from 'react';

import { ChartPreview } from '../ChartPreview';
import { UploadCsvChartFile } from '../UploadCsvChartFile';

const StepperActions = {
  0: 'Upload CSV & Select a Chart Type',
  1: 'Preview chart',
} as const;

export type StepperActions = keyof typeof StepperActions;

export const CustomStepper: React.FC = () => {
  const [activeStep, setActiveStep] = useState<StepperActions>(0);
  const [fileId, setFileId] = useState<string>('');

  const getStepContent = (stepIndex: StepperActions) => {
    switch (stepIndex) {
      case 0:
        return <UploadCsvChartFile setActiveStep={setActiveStep} setFileId={setFileId} />;
      case 1:
        return <ChartPreview chartId={fileId} uploadedDatafilePath="test" />;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ width: '100%' }}>
        {Object.values(StepperActions).map((label, i) => (
          <Step key={i}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box>{getStepContent(activeStep)}</Box>
    </Box>
  );
};
