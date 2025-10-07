-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "userTypeId" INTEGER NOT NULL,
    "userStatusId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTypes" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "UserTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserStatus" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "UserStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sows" (
    "id" SERIAL NOT NULL,
    "rfid" TEXT NOT NULL,
    "earTagNumber" TEXT NOT NULL,
    "cycles" INTEGER NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Sows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inseminations" (
    "id" SERIAL NOT NULL,
    "sowId" INTEGER NOT NULL,
    "inseminationDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "removalReason" TEXT,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Inseminations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Confinements" (
    "id" SERIAL NOT NULL,
    "inseminationId" INTEGER NOT NULL,
    "feedPlansId" INTEGER NOT NULL,
    "confinementDate" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Confinements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedPlans" (
    "id" SERIAL NOT NULL,
    "feedPlanTypeId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "totalDays" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "FeedPlans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedPlanTypes" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "FeedPlanTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedPlanPhases" (
    "id" SERIAL NOT NULL,
    "feedPlanId" INTEGER NOT NULL,
    "feedPortionId" INTEGER NOT NULL,
    "startDay" INTEGER NOT NULL,
    "endDay" INTEGER NOT NULL,

    CONSTRAINT "FeedPlanPhases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedPortions" (
    "id" SERIAL NOT NULL,
    "feedAmountInGrams" INTEGER NOT NULL,

    CONSTRAINT "FeedPortions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedingAdjustments" (
    "id" SERIAL NOT NULL,
    "confinementId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "alertId" INTEGER NOT NULL,
    "startDay" INTEGER NOT NULL,
    "endDay" INTEGER NOT NULL,
    "adjustedAmount" INTEGER NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeedingAdjustments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedingRecords" (
    "id" SERIAL NOT NULL,
    "confinementId" INTEGER NOT NULL,
    "entryDateTime" TIMESTAMP(3) NOT NULL,
    "exitDateTime" TIMESTAMP(3) NOT NULL,
    "amountConsumed" INTEGER NOT NULL,

    CONSTRAINT "FeedingRecords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alerts" (
    "id" SERIAL NOT NULL,
    "alertTypeId" INTEGER NOT NULL,
    "alertStatusId" INTEGER NOT NULL,
    "confinementId" INTEGER,
    "userId" INTEGER,
    "feedingAdjustmentId" INTEGER,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Alerts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlertTypes" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "AlertTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlertStatus" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "AlertStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlertParameter" (
    "id" SERIAL NOT NULL,
    "maxFeedingTimeMinutes" INTEGER NOT NULL,
    "maxIntervalWithoutFeedingHours" INTEGER NOT NULL,
    "rfidReadTolerance" INTEGER NOT NULL,
    "minAmountWithoutAlertGrams" INTEGER NOT NULL,

    CONSTRAINT "AlertParameter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeederSetting" (
    "id" SERIAL NOT NULL,
    "motorFeedOnTimeSeconds" INTEGER NOT NULL,
    "portionAmountGrams" INTEGER NOT NULL,
    "portionIntervalSeconds" INTEGER NOT NULL,
    "entryDoorDelaySeconds" INTEGER NOT NULL,

    CONSTRAINT "FeederSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserTypes_description_key" ON "UserTypes"("description");

-- CreateIndex
CREATE UNIQUE INDEX "UserStatus_description_key" ON "UserStatus"("description");

-- CreateIndex
CREATE UNIQUE INDEX "Sows_rfid_key" ON "Sows"("rfid");

-- CreateIndex
CREATE UNIQUE INDEX "Sows_earTagNumber_key" ON "Sows"("earTagNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Confinements_inseminationId_key" ON "Confinements"("inseminationId");

-- CreateIndex
CREATE UNIQUE INDEX "FeedPlanTypes_description_key" ON "FeedPlanTypes"("description");

-- CreateIndex
CREATE UNIQUE INDEX "AlertTypes_description_key" ON "AlertTypes"("description");

-- CreateIndex
CREATE UNIQUE INDEX "AlertStatus_description_key" ON "AlertStatus"("description");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_userTypeId_fkey" FOREIGN KEY ("userTypeId") REFERENCES "UserTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_userStatusId_fkey" FOREIGN KEY ("userStatusId") REFERENCES "UserStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inseminations" ADD CONSTRAINT "Inseminations_sowId_fkey" FOREIGN KEY ("sowId") REFERENCES "Sows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Confinements" ADD CONSTRAINT "Confinements_feedPlansId_fkey" FOREIGN KEY ("feedPlansId") REFERENCES "FeedPlans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Confinements" ADD CONSTRAINT "Confinements_inseminationId_fkey" FOREIGN KEY ("inseminationId") REFERENCES "Inseminations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedPlans" ADD CONSTRAINT "FeedPlans_feedPlanTypeId_fkey" FOREIGN KEY ("feedPlanTypeId") REFERENCES "FeedPlanTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedPlanPhases" ADD CONSTRAINT "FeedPlanPhases_feedPlanId_fkey" FOREIGN KEY ("feedPlanId") REFERENCES "FeedPlans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedPlanPhases" ADD CONSTRAINT "FeedPlanPhases_feedPortionId_fkey" FOREIGN KEY ("feedPortionId") REFERENCES "FeedPortions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedingAdjustments" ADD CONSTRAINT "FeedingAdjustments_confinementId_fkey" FOREIGN KEY ("confinementId") REFERENCES "Confinements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedingAdjustments" ADD CONSTRAINT "FeedingAdjustments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedingRecords" ADD CONSTRAINT "FeedingRecords_confinementId_fkey" FOREIGN KEY ("confinementId") REFERENCES "Confinements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alerts" ADD CONSTRAINT "Alerts_alertTypeId_fkey" FOREIGN KEY ("alertTypeId") REFERENCES "AlertTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alerts" ADD CONSTRAINT "Alerts_alertStatusId_fkey" FOREIGN KEY ("alertStatusId") REFERENCES "AlertStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alerts" ADD CONSTRAINT "Alerts_confinementId_fkey" FOREIGN KEY ("confinementId") REFERENCES "Confinements"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alerts" ADD CONSTRAINT "Alerts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alerts" ADD CONSTRAINT "Alerts_feedingAdjustmentId_fkey" FOREIGN KEY ("feedingAdjustmentId") REFERENCES "FeedingAdjustments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
