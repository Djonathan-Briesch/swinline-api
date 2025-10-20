import { Injectable } from '@nestjs/common';
import { FeederSettingsSyncService } from './feeder-settings-sync.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class FeederSettingsSyncScheduler {
  constructor(private readonly syncService: FeederSettingsSyncService) {}

  // Envio toda segunda feira as 08:00h
  @Cron('0 8 * * 1')
  async weeklySync() {
    await this.syncService.syncLatestConfig();
  }
}
