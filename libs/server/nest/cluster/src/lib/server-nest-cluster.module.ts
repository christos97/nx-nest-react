import { Module } from '@nestjs/common';

import { ClusterModule } from './server-nest-cluster.service';

@Module({
  providers: [ClusterModule],
})
export class ServerNestClusterModule {}
