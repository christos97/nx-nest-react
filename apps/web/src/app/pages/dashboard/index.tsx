import { UploadWizard } from '@ntua-saas-10/web/features/upload-wizard';
import { UiCard } from '@ntua-saas-10/web/ui/card';
import { FormProvider, useForm } from 'react-hook-form';
import { MAX_FILE_SIZE } from '../../constants/app.constants';
import { Utils } from '@ntua-saas-10/shared-utils';
import { Resources } from '@ntua-saas-10/shared-api-interfaces';

const UploadWizardProps = {
  path: Resources.datafiles.create.path,
  schema: Utils.createUploadFileSchema({
    allowedTypes: ['text/csv'],
    maxSize: MAX_FILE_SIZE,
  }),
};

const Dashboard: React.FC = () => {
  return (
    <div>
      {/* <UiToolbar>Dashboard</UiToolbar> */}
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
