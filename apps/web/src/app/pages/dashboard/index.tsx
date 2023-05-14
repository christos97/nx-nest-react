import { ApiLookup, createUploadFileSchema } from '@ntua-saas-10/api-interfaces';
import { UploadWizard } from '@ntua-saas-10/web/features/upload-wizard';
import { UiCard } from '@ntua-saas-10/web/ui/card';
import { UiToolbar } from '@ntua-saas-10/web/ui/toolbar';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const UploadCsvSchema = createUploadFileSchema({ allowedTypes: ['text/csv'], maxSize: MAX_FILE_SIZE });

const Dashboard: React.FC = () => {
  const path = ApiLookup.services.upload.path;
  return (
    <div>
      <UiToolbar>
        Dashboard
      </UiToolbar>
      <main>
        <UiCard>
          <UploadWizard
            path={path}
            schema={UploadCsvSchema}
            mimeType='text/csv'
          />
        </UiCard>
        </main>
    </div>
  );
};

export default Dashboard;
