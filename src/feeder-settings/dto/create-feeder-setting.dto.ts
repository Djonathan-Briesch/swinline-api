import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateFeederSettingDto {
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  motorFeedOnTimeSeconds: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  portionAmountGrams: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  portionIntervalSeconds: number;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  entryDoorDelaySeconds: number;
}
