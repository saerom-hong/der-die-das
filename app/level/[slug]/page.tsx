import { GermanLevel } from "../../../lib/levels";
import db from "../../../lib/prisma";
import { VocaProvider } from "./context";
import LevelClientPage from "./levelClientPage";

export default function LevelPage({
  params,
}: {
  params: { slug: GermanLevel };
}) {
  const vocaPromise = db.vocabulary.findMany({
    where: { level: params.slug },
  });

  return (
    <VocaProvider vocaPromise={vocaPromise}>
      <LevelClientPage currentLevel={params.slug} />
    </VocaProvider>
  );
}
