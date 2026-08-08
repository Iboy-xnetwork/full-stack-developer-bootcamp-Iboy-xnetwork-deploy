-- CreateTable
CREATE TABLE "Brew" (
    "id" SERIAL NOT NULL,
    "coffeeName" TEXT NOT NULL,
    "brewMethod" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "tastingNotes" TEXT NOT NULL,
    "brewDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Brew_pkey" PRIMARY KEY ("id")
);
