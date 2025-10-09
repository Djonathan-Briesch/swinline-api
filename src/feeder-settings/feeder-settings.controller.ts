import {
  Controller,
  Get,
  Post,
  Body,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FeederSettingsService } from './feeder-settings.service';
import { CreateFeederSettingDto } from './dto/create-feeder-setting.dto';
import { CreateFeederSettingResponseDTO } from './dto/create-feeder-settings-response.dto';
import { plainToInstance } from 'class-transformer';
import { FindLastFeederSettingResponseDTO } from './dto/find-last-feeder-settings-response.dto';

@Controller('feeder-settings')
export class FeederSettingsController {
  constructor(private readonly feederSettingsService: FeederSettingsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createFeederSettingDto: CreateFeederSettingDto,
  ): Promise<CreateFeederSettingResponseDTO> {
    const created = await this.feederSettingsService.create(
      createFeederSettingDto,
    );
    return plainToInstance(CreateFeederSettingResponseDTO, created);
  }

  @Get()
  async findLast(): Promise<FindLastFeederSettingResponseDTO> {
    const lastConfig = await this.feederSettingsService.findLast();

    if (!lastConfig) {
      throw new NotFoundException('Nenhuma configuração encontrada');
    }

    return lastConfig;
  }
}
