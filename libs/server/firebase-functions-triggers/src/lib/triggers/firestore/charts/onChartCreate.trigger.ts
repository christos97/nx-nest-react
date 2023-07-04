import { firestoreFunc } from '../../../_';

export const chartCreatedTrigger = firestoreFunc
  .document('charts/{chartId}')
  .onCreate(async (change, context) => {
    console.log('onDocumentCreateTrigger', change, context);
  });
