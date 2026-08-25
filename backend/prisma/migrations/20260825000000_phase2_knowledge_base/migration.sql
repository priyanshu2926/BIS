-- CreateEnum
CREATE TYPE "ExtractionStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "Standard" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Standard_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "StandardDocument" (
    "id" TEXT NOT NULL,
    "standardId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "sourceUrl" TEXT,
    "documentVersion" TEXT,
    "pageCount" INTEGER,
    "extractionStatus" "ExtractionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "StandardDocument_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "StandardChunk" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "chunkIndex" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "pageNumber" INTEGER NOT NULL,
    "sectionTitle" TEXT,
    "metadata" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "StandardChunk_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Standard_number_key" ON "Standard"("number");
CREATE INDEX "Standard_title_idx" ON "Standard"("title");
CREATE INDEX "StandardDocument_standardId_idx" ON "StandardDocument"("standardId");
CREATE INDEX "StandardDocument_extractionStatus_idx" ON "StandardDocument"("extractionStatus");
CREATE INDEX "StandardChunk_documentId_pageNumber_idx" ON "StandardChunk"("documentId", "pageNumber");
CREATE INDEX "StandardChunk_sectionTitle_idx" ON "StandardChunk"("sectionTitle");
CREATE UNIQUE INDEX "StandardChunk_documentId_chunkIndex_key" ON "StandardChunk"("documentId", "chunkIndex");

ALTER TABLE "StandardDocument" ADD CONSTRAINT "StandardDocument_standardId_fkey" FOREIGN KEY ("standardId") REFERENCES "Standard"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StandardChunk" ADD CONSTRAINT "StandardChunk_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "StandardDocument"("id") ON DELETE CASCADE ON UPDATE CASCADE;
