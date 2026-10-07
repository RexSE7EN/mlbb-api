/*
  Warnings:

  - Made the column `hpGrowth` on table `hero_attributes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `hpRegen` on table `hero_attributes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mana` on table `hero_attributes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `manaGrowth` on table `hero_attributes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `manaRegen` on table `hero_attributes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `physicalAttack` on table `hero_attributes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `physicalAttackGrowth` on table `hero_attributes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `magicPower` on table `hero_attributes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `physicalDefense` on table `hero_attributes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `magicDefense` on table `hero_attributes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `attackSpeed` on table `hero_attributes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `attackSpeedGrowth` on table `hero_attributes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `movementSpeed` on table `hero_attributes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `attackRange` on table `hero_attributes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "hero_attributes" ALTER COLUMN "hp" SET DEFAULT 0.0,
ALTER COLUMN "hpGrowth" SET NOT NULL,
ALTER COLUMN "hpGrowth" SET DEFAULT 0.0,
ALTER COLUMN "hpRegen" SET NOT NULL,
ALTER COLUMN "hpRegen" SET DEFAULT 0.0,
ALTER COLUMN "mana" SET NOT NULL,
ALTER COLUMN "mana" SET DEFAULT 0.0,
ALTER COLUMN "manaGrowth" SET NOT NULL,
ALTER COLUMN "manaGrowth" SET DEFAULT 0.0,
ALTER COLUMN "manaRegen" SET NOT NULL,
ALTER COLUMN "manaRegen" SET DEFAULT 0.0,
ALTER COLUMN "physicalAttack" SET NOT NULL,
ALTER COLUMN "physicalAttack" SET DEFAULT 0.0,
ALTER COLUMN "physicalAttackGrowth" SET NOT NULL,
ALTER COLUMN "physicalAttackGrowth" SET DEFAULT 0.0,
ALTER COLUMN "magicPower" SET NOT NULL,
ALTER COLUMN "magicPower" SET DEFAULT 0.0,
ALTER COLUMN "physicalDefense" SET NOT NULL,
ALTER COLUMN "physicalDefense" SET DEFAULT 0.0,
ALTER COLUMN "magicDefense" SET NOT NULL,
ALTER COLUMN "magicDefense" SET DEFAULT 0.0,
ALTER COLUMN "attackSpeed" SET NOT NULL,
ALTER COLUMN "attackSpeed" SET DEFAULT 0.0,
ALTER COLUMN "attackSpeedGrowth" SET NOT NULL,
ALTER COLUMN "attackSpeedGrowth" SET DEFAULT 0.0,
ALTER COLUMN "movementSpeed" SET NOT NULL,
ALTER COLUMN "movementSpeed" SET DEFAULT 0.0,
ALTER COLUMN "attackRange" SET NOT NULL,
ALTER COLUMN "attackRange" SET DEFAULT 0.0;
