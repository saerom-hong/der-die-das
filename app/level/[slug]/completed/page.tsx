import { LevelLink } from "../../../../components/LevelLink";

export default function CompletePage({ params }: { params: { slug: string } }) {
  return (
    <>
      <h1 className="text-6xl mb-8 font-bold">You completed {params.slug}!</h1>
      <p className="text-xl mb-8">
        Great job – you finished all the words in this level.
      </p>
      <div className="m-8">
        <LevelLink href="/level" className="m-4 px-15">
          Want to play more?
        </LevelLink>
        <LevelLink href={`/level/${params.slug}`} className="m-4 px-15">
          Restart this level
        </LevelLink>
      </div>
    </>
  );
}
