import { Button } from "../../components/Button";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center">
        <h1 className="text-6xl mb-8 font-bold">Der Die Das</h1>
        <Button className="m-4 px-15">Get Started</Button>
        <Button variant="secondary">I already have an account</Button>
      </main>
    </div>
  );
}
