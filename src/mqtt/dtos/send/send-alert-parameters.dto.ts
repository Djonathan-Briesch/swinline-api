export class SendAlertParametersDTO {
  maxFeedingTimeMinutes: number;
  maxnumberervalWithoutFeedingHours: number;
  rfidReadTolerance: number;
  minAmountWithoutAlertGrams: number;
  alertTypes: [
    {
      id: number;
      description: string;
    },
  ];
}
