/*
  Warnings:

  - A unique constraint covering the columns `[userName]` on the table `x_users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "x_users_userName_key" ON "x_users"("userName");
