import { PrismaClient, $Enums } from "../app/generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";
import vocaA1 from "../data/voca_A1.json";
import vocaA2 from "../data/voca_A2.json";

const prisma = new PrismaClient().$extends(withAccelerate());

const vocabularyData = {
  A1: vocaA1,
  A2: vocaA2,
  B1: [
    {
      "word": "Universität",
      "article": "Die",
      "translation": "university"
    }
  ],
  B2: []
};

// const userData: Prisma.UserCreateInput[] = [
//  {
//    name: "Alice",
//    email: "alice@prisma.io",
//  },
//  {
//    name: "Bob",
//    email: "bob@prisma.io",
//  }
//];

export async function main() {
  //
  //console.log("Seeding users...");
  //for (const u of userData) {
  //  await prisma.user.create({ data: u });
  //}
  
  console.log("Adding new vocabulary...");
  
  let newWordsCount = 0;
  
  // Process vocabulary data from JSON
  for (const [level, words] of Object.entries(vocabularyData)) {
    for (const wordData of words) {
      // Check if word already exists
      const existingWord = await prisma.vocabulary.findFirst({
        where: {
          word: wordData.word,
          article: wordData.article as $Enums.Article,
          level: level as $Enums.LanguageLevel
        }
      });

      // Only add if word doesn't exist
      if (!existingWord) {
        await prisma.vocabulary.create({
          data: {
            word: wordData.word,
            article: wordData.article as $Enums.Article,
            translation: wordData.translation,
            level: level as $Enums.LanguageLevel
          }
        });
        newWordsCount++;
      }
    }
  }

  const totalCount = await prisma.vocabulary.count();
  console.log(`Added ${newWordsCount} new words. Total vocabulary count: ${totalCount}`);
}

main();