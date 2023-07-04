import { firestoreFunc } from '../../../_';

export const chartUpdatedTrigger = firestoreFunc
  .document('charts/{chartId}')
  .onUpdate(async (change, context) => {
    console.log('onDocumentUpdateTrigger', change, context);
  });
