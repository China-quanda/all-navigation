-- CreateTable
CREATE TABLE "tb_user" (
    "id" SERIAL NOT NULL,
    "create_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_time" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nickname" TEXT,
    "avatar" TEXT,

    CONSTRAINT "tb_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_menu" (
    "id" SERIAL NOT NULL,
    "create_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_time" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,

    CONSTRAINT "tb_menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_navigation" (
    "id" SERIAL NOT NULL,
    "create_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_time" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "icon" TEXT,
    "desc" TEXT,
    "parent_id" INTEGER,

    CONSTRAINT "tb_navigation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_user_email_key" ON "tb_user"("email");

-- AddForeignKey
ALTER TABLE "tb_navigation" ADD CONSTRAINT "tb_navigation_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "tb_navigation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
