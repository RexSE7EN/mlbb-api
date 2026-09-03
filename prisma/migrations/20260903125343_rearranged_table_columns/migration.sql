/*
  Warnings:

  - You are about to drop the column `attribute` on the `item_attributes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "emblem_talents" DROP CONSTRAINT "emblem_talents_emblemId_fkey";

-- DropForeignKey
ALTER TABLE "hero_attributes" DROP CONSTRAINT "hero_attributes_heroId_fkey";

-- DropForeignKey
ALTER TABLE "item_attributes" DROP CONSTRAINT "item_attributes_itemId_fkey";

-- DropForeignKey
ALTER TABLE "skills" DROP CONSTRAINT "skills_heroId_fkey";

-- DropForeignKey
ALTER TABLE "skins" DROP CONSTRAINT "skins_heroId_fkey";

-- AlterTable
ALTER TABLE "item_attributes" DROP COLUMN "attribute";

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "heroes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skins" ADD CONSTRAINT "skins_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "heroes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hero_attributes" ADD CONSTRAINT "hero_attributes_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "heroes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_attributes" ADD CONSTRAINT "item_attributes_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emblem_talents" ADD CONSTRAINT "emblem_talents_emblemId_fkey" FOREIGN KEY ("emblemId") REFERENCES "emblems"("id") ON DELETE CASCADE ON UPDATE CASCADE;
