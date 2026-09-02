/*
  Warnings:

  - Added the required column `skillCost` to the `skills` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ItemAttributeType" AS ENUM ('HP', 'HP_REGEN', 'MANA', 'MANA_REGEN', 'ADAPTIVE_ATTACK', 'PHYSICAL_ATTACK', 'PHYSICAL_DEFENSE', 'MAGIC_POWER', 'MAGIC_DEFENSE', 'ATTACK_SPEED', 'MOVEMENT_SPEED', 'SLOW_REDUCTION', 'COOLDOWN_REDUCTION', 'CRIT_RATE', 'CRIT_CHANCE', 'LIFE_STEAL', 'HYBRID_LIFE_STEAL', 'SPELL_VAMP', 'MAGIC_PENETRATION');

-- CreateEnum
CREATE TYPE "BlessingType" AS ENUM ('ICE', 'BLOODY', 'FLAME', 'ENCOURAGE', 'FAVOUR', 'DIRE_HIT', 'CONCEAL');

-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('MAGIC', 'PHYSICAL', 'DEFENSE', 'MOVEMENT');

-- AlterTable
ALTER TABLE "skills" ADD COLUMN     "skillCost" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "blessings" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "type" "BlessingType" NOT NULL,

    CONSTRAINT "blessings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_attributes" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "attribute" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "type" "ItemAttributeType" NOT NULL,

    CONSTRAINT "item_attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jungle_creeps" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "gold" INTEGER NOT NULL,
    "hp" DOUBLE PRECISION NOT NULL,
    "XP" DOUBLE PRECISION NOT NULL,
    "attack" DOUBLE PRECISION NOT NULL,
    "physicalDefense" DOUBLE PRECISION NOT NULL,
    "magicDefense" DOUBLE PRECISION NOT NULL,
    "firstSpawn" DOUBLE PRECISION NOT NULL,
    "respawnTime" DOUBLE PRECISION NOT NULL,
    "reward" TEXT,

    CONSTRAINT "jungle_creeps_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "item_attributes" ADD CONSTRAINT "item_attributes_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
