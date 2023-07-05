import { Injectable, Logger } from '@nestjs/common';
import { firestore } from '@ntua-saas-10/server-firebase-admin';
import { Types } from '@ntua-saas-10/shared-types';

import { CollectionsPaths } from '@ntua-saas-10/shared-consts';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  private readonly NOTIFICATIONS_COLLECTION_PATH = CollectionsPaths.NOTIFICATIONS_COLLECTION_PATH;
  async saveNotificationToFirestore(
    uid: string,
    docId: string,
    notification: Types.UserNotification,
  ) {
    try {
      await firestore
        .collection(this.NOTIFICATIONS_COLLECTION_PATH.replace('{uid}', uid))
        .add(notification);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
