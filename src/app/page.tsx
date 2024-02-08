import ThemeChanger from "@/lib/ThemeChanger"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <ThemeChanger />
        <p>practica</p>
      </div>
    </main>
  );
}
