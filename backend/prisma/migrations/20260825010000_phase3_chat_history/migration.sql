-- Phase 3: persistent assistant conversation history.
CREATE TYPE "ChatRole" AS ENUM ('USER', 'ASSISTANT', 'SYSTEM');

CREATE TABLE "ChatSession" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'New Conversation',
    "mode" TEXT NOT NULL DEFAULT 'industry',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ChatSession_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ChatMessage" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "role" "ChatRole" NOT NULL,
    "content" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ChatSession_mode_idx" ON "ChatSession"("mode");
CREATE INDEX "ChatSession_createdAt_idx" ON "ChatSession"("createdAt");
CREATE INDEX "ChatMessage_sessionId_createdAt_idx" ON "ChatMessage"("sessionId", "createdAt");

ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_sessionId_fkey"
  FOREIGN KEY ("sessionId") REFERENCES "ChatSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
