import { PrismaClient, $Enums } from "../app/generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";
import vocabularyData from "../data/vocabulary.json";

const prisma = new PrismaClient().$extends(withAccelerate());

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