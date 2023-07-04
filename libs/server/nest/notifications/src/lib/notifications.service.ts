import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firestore } from '@ntua-saas-10/server-firebase-admin';
import { Types } from '@ntua-saas-10/shared-types';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  private readonly NOTIFICATIONS_COLLECTION_PATH: string;

  constructor(private configService: ConfigService) {
    this.NOTIFICATIONS_COLLECTION_PATH = configService.getOrThrow('NOTIFICATIONS_COLLECTION_PATH');
  }
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
