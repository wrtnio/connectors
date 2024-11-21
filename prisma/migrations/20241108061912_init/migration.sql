-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- CreateTable
CREATE TABLE "airport_informations" (
    "id" UUID NOT NULL,
    "en_airport_name" TEXT NOT NULL,
    "en_city_name" TEXT NOT NULL,
    "ko_airport_name" TEXT NOT NULL,
    "kr_country_name" TEXT NOT NULL,
    "kr_city_name" TEXT NOT NULL,
    "airport_code" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "airport_informations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crunchbase" (
    "id" UUID NOT NULL,
    "organization_identifier" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "crunchbase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "similarweb" (
    "id" UUID NOT NULL,
    "domain" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "similarweb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "x_users" (
    "id" UUID NOT NULL,
    "tweet_user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "x_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "x_tweet" (
    "id" UUID NOT NULL,
    "tweet_id" TEXT NOT NULL,
    "x_user_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "link" VARCHAR(80000) NOT NULL,
    "type" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "x_tweet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "airport_informations_airport_code_idx" ON "airport_informations"("airport_code");

-- CreateIndex
CREATE UNIQUE INDEX "crunchbase_organization_identifier_created_at_key" ON "crunchbase"("organization_identifier", "created_at");

-- CreateIndex
CREATE INDEX "similarweb_created_at_idx" ON "similarweb"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "similarweb_domain_key" ON "similarweb"("domain");

-- CreateIndex
CREATE INDEX "x_users_created_at_idx" ON "x_users"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "x_users_tweet_user_id_key" ON "x_users"("tweet_user_id");

-- CreateIndex
CREATE INDEX "x_tweet_created_at_idx" ON "x_tweet"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "x_tweet_tweet_id_key" ON "x_tweet"("tweet_id");

-- AddForeignKey
ALTER TABLE "x_tweet" ADD CONSTRAINT "x_tweet_x_user_id_fkey" FOREIGN KEY ("x_user_id") REFERENCES "x_users"("tweet_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
