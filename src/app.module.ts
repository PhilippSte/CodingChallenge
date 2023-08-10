import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { UploadController } from './upload/upload.controller';
import { UploadService } from './upload/upload.service';
import { UploadModule } from './upload/upload.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './users/roles.guard';

@Module({
  imports: [AuthModule, UsersModule, UploadModule],
  controllers: [AppController, AuthController, UploadController],
  providers: [AppService, UploadService, {provide: APP_GUARD, useClass: RolesGuard}],
})
export class AppModule {}
