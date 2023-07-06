import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import React, { useEffect, useState } from 'react';

import { UploadCsvChartFile } from '../UploadCsvChartFile';
import ChartPreview from '../ChartPreview';
import { Box } from '@mui/material';

const steps = ['Upload CSV & Select a Chart Type', 'Preview chart'];

export const CustomStepper: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [fileId, setFileId] = useState<string | null>(null);

  useEffect(() => {
    console.log({ fileId });
  }, [fileId]);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getStepContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return <UploadCsvChartFile setActiveStep={setActiveStep} setFileId={setFileId} />;
      case 1:
        return <ChartPreview chartId={fileId ?? ''} uploadedDatafilePath="test" />;
      default:
        return 'Unknown stepIndex';
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ width: '100%' }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <div>{getStepContent(activeStep)}</div>
      </div>
    </Box>
  );
};
