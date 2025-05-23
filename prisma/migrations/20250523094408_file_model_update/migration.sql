/*
  Warnings:

  - Added the required column `relative_path` to the `core_files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "core_files" ADD COLUMN     "relative_path" TEXT NOT NULL;
