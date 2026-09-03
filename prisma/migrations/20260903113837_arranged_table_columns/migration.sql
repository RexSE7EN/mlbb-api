-- AlterEnum
ALTER TYPE "BlessingType" ADD VALUE 'UNDEFINED';

-- AlterEnum
ALTER TYPE "ItemAttributeType" ADD VALUE 'UNDEFINED';

-- AlterEnum
ALTER TYPE "ItemType" ADD VALUE 'UNDEFINED';

-- AlterTable
ALTER TABLE "blessings" ALTER COLUMN "type" SET DEFAULT 'UNDEFINED';

-- AlterTable
ALTER TABLE "item_attributes" ALTER COLUMN "type" SET DEFAULT 'UNDEFINED';

-- AlterTable
ALTER TABLE "items" ADD COLUMN     "type" "ItemType" NOT NULL DEFAULT 'UNDEFINED';
