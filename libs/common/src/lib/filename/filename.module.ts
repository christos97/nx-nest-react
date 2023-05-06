import { Module } from '@nestjs/common';
import { FilenameService } from './filename.service';

@Module({
  providers: [FilenameService],
  exports: [FilenameService],
})
export class FilenameModule {}
