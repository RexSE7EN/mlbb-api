/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `user_api_tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_api_tokens_userId_key" ON "user_api_tokens"("userId");
