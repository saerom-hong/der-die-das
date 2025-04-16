import React from "react";

export default function LevelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center">{children}</main>
    </div>
  );
}
