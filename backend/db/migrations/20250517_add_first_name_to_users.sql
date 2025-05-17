-- Add firstName column to Users table
ALTER TABLE "Users" ADD COLUMN "firstName" VARCHAR(50);

-- Add NOT NULL constraint if needed
-- ALTER TABLE "Users" ALTER COLUMN "firstName" SET NOT NULL;
