import { LevelLink } from "../../components/LevelLink";
import { GERMAN_LEVELS } from "../../lib/levels";

export default function Level() {
  return (
    <>
      <h1 className="text-4xl mb-8 font-bold">Which Level You Want to Play?</h1>
      {GERMAN_LEVELS.map((level) => (
        <LevelLink key={level} href={`/level/${level}`}>
          {level}
        </LevelLink>
      ))}
    </>
  );
}
