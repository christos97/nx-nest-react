import { ApiLookup, createUploadFileSchema } from '@ntua-saas-10/api-interfaces';
import { UploadWizard } from '@ntua-saas-10/web/features/upload-wizard';
import { UiCard } from '@ntua-saas-10/web/ui/card';
import { UiToolbar } from '@ntua-saas-10/web/ui/toolbar';
import { FormProvider, useForm } from 'react-hook-form';
import { MAX_FILE_SIZE } from '../../constants/app.constants';

const UploadWizardProps = {
  path: ApiLookup.services.upload.path,
  schema: createUploadFileSchema({
    allowedTypes: ['text/csv'],
    maxSize: MAX_FILE_SIZE,
  }),
};

const Dashboard: React.FC = () => {
  return (
    <div>
      <UiToolbar>Dashboard</UiToolbar>
      <main>
        <UiCard>
          <FormProvider {...useForm()}>
            <UploadWizard {...UploadWizardProps} />
          </FormProvider>
        </UiCard>
      </main>
    </div>
  );
};

export default Dashboard;
