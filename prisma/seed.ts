import { PrismaClient, Prisma } from "../src/app/generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
  },
  {
    name: "Bob",
    email: "bob@prisma.io",
  }
];

const vocabularyData: Prisma.VocabularyCreateInput[] = [
  {
    word: "Haus",
    article: "Das",
    translation: "house",
    level: "A1"
  },
  {
    word: "Mann",
    article: "Der",
    translation: "man",
    level: "A1"
  },
  {
    word: "Frau",
    article: "Die",
    translation: "woman",
    level: "A1"
  },
  {
    word: "Zeitung",
    article: "Die",
    translation: "newspaper",
    level: "A2"
  },
  {
    word: "Computer",
    article: "Der",
    translation: "computer",
    level: "A2"
  },
  {
    word: "Universität",
    article: "Die",
    translation: "university",
    level: "B1"
  }
];

export async function main() {
  console.log("Seeding users...");
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }

  console.log("Seeding vocabulary...");
  for (const v of vocabularyData) {
    await prisma.vocabulary.create({ data: v });
  }
}

main();